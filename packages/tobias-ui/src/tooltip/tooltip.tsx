import type { PropType, VNode } from 'vue'
import { computed, createVNode, defineComponent, ref, unref } from 'vue'
import type { Placement } from '@floating-ui/vue'
import { offset, useFloating } from '@floating-ui/vue'
import { filterEmpty, isBaseType } from '@v-c/utils'
import { useClassnames } from '@tobias-ui/utils'

export default defineComponent({
  name: 'TTooltip',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'top', // [top|bottom|left|right]-[start|end]
    },
    content: {
      type: String as PropType<string>,
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover',
    },
  },
  setup(props, { slots, attrs }) {
    // 条件类型
    let timer: ReturnType<typeof setTimeout> | null = null

    const reference = ref(null)
    const floating = ref(null)
    const show = ref(false)

    const placement = computed(() => props.placement)

    const { c } = useClassnames('tooltip')

    const { floatingStyles } = useFloating(reference, floating, {
      placement, // placement属性的值是一个经过计算的Ref类型。注意此处不能直接写props.placement，否则其响应式会丢失
      middleware: [offset(4)],
    })

    const handleReferenceMouseEnter = () => {
      if (props.trigger !== 'hover')
        return

      show.value = true
    }

    const handleReferenceClick = () => {
      if (props.trigger !== 'click')
        return

      show.value = true
    }

    const handleReferenceMouseLeave = () => {
      timer = setTimeout(() => {
        show.value = false
      }, 150)
    }

    const handleFloatingMouseEnter = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    const handleFloatingMouseLeave = () => {
      show.value = false
    }

    // 该函数会在该函数内部被使用（被搜集）的响应式数据发生变化时被调用，如props.content、show等发生变化时，该函数会重新执行
    return () => {
      // 渲染信息提示组件的具体内容的函数
      const renderFloating = () => {
        if (!unref(reference))
          return null

        if (!unref(show))
          return null

        const cls = [c(['floating', 'E'])]

        const floatingEvents = {
          onMouseenter: handleFloatingMouseEnter,
          onMouseleave: handleFloatingMouseLeave,
        }
        return (
          <div ref={floating} class={cls} style={unref(floatingStyles)} {...floatingEvents}>
            {slots.content ? slots.content() : props.content}
          </div>
        )
      }

      // 渲染信息提示组件的触发元素的函数
      const renderReference = () => {
      // 根据是否有default插槽内容来决定整个信息提示组件的渲染与否
      // filterEmpty接收VNodeChild[]，过滤掉空的节点，返回VNodeChild[]
      // 如果在使用TTooltip时，显式地给了default插槽，并且插槽中存在注释节点，如下所示：
      // <template #default>
      //   <!--  -->
      //   <span>点击</span>
      // </template>
      // 那么，注释节点会被filterEmpty方法过滤掉
        const referenceChildren = filterEmpty(slots.default?.())
        if (referenceChildren.length === 0)
          return null

        if (referenceChildren.length > 1) {
          console.warn('TTooltip can only have one child!')
          return referenceChildren
        }

        const node = referenceChildren[0]
        if (isBaseType(node)) {
          console.warn('TTooltip must have a child component')
          return node
        }

        // 上面返回的元素节点不能进行交互

        const referenceEvents = {
          onMouseenter: handleReferenceMouseEnter,
          onMouseleave: handleReferenceMouseLeave,
          onClick: handleReferenceClick,
        }

        // 使用h函数也可以
        const referenceNode = createVNode(node as VNode, {
          ref: reference,
          ...referenceEvents,
          ...attrs,
        })

        return referenceNode
      }

      return (
        <>
          {renderReference()}
          {renderFloating()}
        </>
      )
    }
  },
})
