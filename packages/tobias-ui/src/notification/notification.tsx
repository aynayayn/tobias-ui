import type { PropType } from 'vue'
import { TransitionGroup, defineComponent, onMounted, ref } from 'vue'
import { omit, uniqueId } from 'lodash-es'
import { useClassnames } from '@tobias-ui/utils'
import type { NotificationConfig, NotificationInfoParams, NotificationInstance } from './interface'

export default defineComponent({
  name: 'TNotification',
  props: {
    onReady: {
      type: Function as PropType<(instance: NotificationInstance) => void>,
    },
  },
  setup(props, { expose }) {
    const { c } = useClassnames('notification')

    const data = ref<NotificationConfig[]>([])

    const add = (configInfo: NotificationInfoParams) => {
      const obj: NotificationConfig = omit({
        id: uniqueId(),
        ...configInfo,
      }, 'appContext')

      if (typeof obj.duration === 'number' && obj.duration !== 0) {
        obj.timer = setTimeout(() => {
          close()
        }, obj.duration)
      }

      data.value.push(obj)

      function close() {
        const index = data.value.findIndex(item => item.id === obj.id)
        if (index !== -1)
          data.value.splice(index, 1)

        if (obj.timer)
          clearTimeout(obj.timer)
      }

      return close
    }

    // 组件的方法合集
    const instance: NotificationInstance = { add }

    expose(instance)

    onMounted(() => {
      props.onReady && props.onReady(instance)
    })

    return () => {
      const renderNotification = () => {
        const itemCls = {
          [c(['item', 'E'])]: true,
        }
        const titleCls = [c(['item', 'E'], ['title', 'E'])]
        const contentCls = [c(['item', 'E'], ['content', 'E'])]
        return data.value.map((item) => {
          return (
            <div class={itemCls} key={item.id}>
              <div class={titleCls}>{item.title}</div>
              <div class={contentCls}>{item.content}</div>
            </div>
          )
        })
      }
      const notificationCls = [c()]

      return (
        <>
          <div class={notificationCls}>
            <TransitionGroup name="tobias-slide-right" tag="div">
              {renderNotification()}
            </TransitionGroup>
          </div>
        </>
      )
    }
  },
})
