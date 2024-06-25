import type { PropType, StyleValue } from 'vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useClassnames } from '@tobias-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'

export default defineComponent({
  name: 'TVirtualList',
  props: {
    itemHeight: {
      type: Number as PropType<number>,
      default: 40,
    },
    data: {
      type: Array as PropType<object[]>,
      default: () => [],
    },
    bufferCount: {
      type: Number as PropType<number>,
      default: 5,
    },
  },
  emits: ['itemClick'],
  setup(props, { attrs, slots, emit }) {
    const { c } = useClassnames('virtual-list')

    const containerRef = ref()
    const scrollTop = ref(0)
    const viewCount = ref(0)

    // 根据props.itemHeight计算列表实际可渲染的列表单个元素的高度
    const actualItemHeight = computed(() => {
      const DEFAULT_ITEM_HEIGHT = 40
      if (!props.itemHeight || props.itemHeight <= 0)
        return DEFAULT_ITEM_HEIGHT

      return props.itemHeight
    })

    const scrollContentHeight = computed(() => props.data.length * actualItemHeight.value)

    const renderList = computed(() => {
      const startIndex = Math.floor(scrollTop.value / actualItemHeight.value)
      const endIndex = startIndex + viewCount.value
      let realStartIndex = startIndex - props.bufferCount
      // realStartIndex < 0 && (realStartIndex = 0)
      realStartIndex = Math.max(0, realStartIndex)
      let realEndIndex = endIndex + props.bufferCount
      // realEndIndex > (props.data.length + 1) && (realEndIndex = props.data.length + 1)
      realEndIndex = Math.min(props.data.length + 1, realEndIndex)

      return props.data.slice(realStartIndex, realEndIndex).map((record, index) => ({
        id: `${realStartIndex + index}abc`,
        top: actualItemHeight.value * (realStartIndex + index),
        record,
      }))
    })

    watch(() => props.itemHeight, () => {
      const viewportHeight = containerRef.value?.clientHeight || 0
      viewCount.value = Math.ceil(viewportHeight / actualItemHeight.value)
    })

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement
      if (!target)
        return

      scrollTop.value = target.scrollTop
    }

    const handleItemClick = (item: Record<string, any>, e: Event) => {
      emit('itemClick', item, e)
    }

    onMounted(() => {
      // 更新可视区域列表显示个数
      const viewportHeight = containerRef.value?.clientHeight || 0
      viewCount.value = Math.ceil(viewportHeight / actualItemHeight.value)

      // 监听可视区域的大小变化，重新计算可视区域应该显示的列表项个数
      const resizeObserver = new ResizeObserver((entries) => {
        const con = entries[0]
        const { height } = con.contentRect
        viewCount.value = Math.ceil(height / actualItemHeight.value)
      })
      resizeObserver.observe(containerRef.value)
    })

    return () => {
      const renderVisualList = () => {
        return renderList.value.map((item) => {
          const itemStyle: StyleValue = {
            width: '100%',
            height: `${actualItemHeight.value}px`,
            position: 'absolute',
            left: 0,
            top: `${item.top}px`,
            lineHeight: `${actualItemHeight.value}px`,
          }
          const handleClick = (e: Event) => {
            handleItemClick(item.record as Record<string, any>, e)
          }
          return (
            <div style={itemStyle} key={item.id} onClick={handleClick}>
              {slots.item && slots.item({ item: item.record })}
            </div>
          )
        })
      }

      const cls = [c()]
      const scrollContentCls = [c('content')]
      const scrollContentStyle = {
        width: '100%',
        height: `${scrollContentHeight.value}px`,
      }
      return (
        <div ref={containerRef} {...attrs} class={cls} onScroll={handleScroll}>
          <div style={scrollContentStyle} class={scrollContentCls}>
            {renderVisualList()}
          </div>
        </div>
      )
    }
  },
})
