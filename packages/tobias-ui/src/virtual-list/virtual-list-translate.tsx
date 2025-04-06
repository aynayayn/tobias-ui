import type { PropType, StyleValue } from 'vue'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useClassnames } from '@tobias-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'

export default defineComponent({
  name: 'TVirtualListTranslate',
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
    const { c } = useClassnames('virtual-list-translate')

    const scrollTop = ref(0)
    const renderStartIndex = ref(0)
    const visualCount = ref(0)
    const containerRef = ref()

    const scrollContentHeight = computed(() => {
      return props.data.length * props.itemHeight
    })

    const actualItemHeight = computed(() => {
      const DEFAULT_ITEM_HEIGHT = 40
      if (!props.itemHeight || props.itemHeight <= 0)
        return DEFAULT_ITEM_HEIGHT

      return props.itemHeight
    })

    watch(() => props.itemHeight, () => {
      const visualHeight = containerRef.value?.clientHeight ?? 0
      visualCount.value = Math.ceil(visualHeight / actualItemHeight.value)
    })

    const getRenderList = computed(() => {
      const startIndex = Math.floor(scrollTop.value / actualItemHeight.value)
      let realStartIndex = startIndex - props.bufferCount
      realStartIndex < 0 && (realStartIndex = 0)
      renderStartIndex.value = realStartIndex
      const endIndex = startIndex + visualCount.value
      let realEndIndex = endIndex + props.bufferCount
      realEndIndex > (props.data.length - 1) && (realEndIndex = props.data.length - 1)

      return props.data.slice(realStartIndex, realEndIndex + 1)
    })

    onMounted(() => {
      // 更新visualCount
      const visualHeight = containerRef.value?.clientHeight ?? 0
      visualCount.value = Math.ceil(visualHeight / actualItemHeight.value)

      // 监听containerRef的dom大小变化
      const resizeObserver = new ResizeObserver((entries) => {
        const con = entries[0]
        const { height } = con.contentRect
        visualCount.value = Math.ceil(height / actualItemHeight.value)
      })
      resizeObserver.observe(containerRef.value)
    })

    function handleScroll(e: Event) {
      const target = e.target as HTMLDivElement
      if (!target)
        return

      scrollTop.value = target.scrollTop
    }

    function handleItemClick(record: Record<string, any>, e: Event) {
      emit('itemClick', record, e)
    }

    return () => {
      const renderVisualList = () => {
        const renderList = () => {
          const itemStyle = {
            width: '100%',
            height: `${actualItemHeight.value}px`,
            lineHeight: `${actualItemHeight.value}px`,
          }

          return getRenderList.value.map((item, index) => {
            const key = `${renderStartIndex.value + index}`
            const handleClick = (e: Event) => {
              handleItemClick(item as Record<string, any>, e)
            }
            return (
              <div key={key} style={itemStyle} onClick={handleClick}>
                {slots.item && slots.item({ item })}
              </div>
            )
          })
        }

        const visualListContainerStyle: StyleValue = {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${renderStartIndex.value * actualItemHeight.value}px)`,
        }
        return (
          <div style={visualListContainerStyle}>
            {renderList()}
          </div>
        )
      }

      const cls = [c()]
      const scrollContentStyle: StyleValue = {
        width: '100%',
        height: `${scrollContentHeight.value}px`,
        position: 'relative',
      }

      return (
        <div ref={containerRef} {...attrs} class={cls} onScroll={handleScroll}>
          <div style={scrollContentStyle}>
            {renderVisualList()}
          </div>
        </div>
      )
    }
  },
})
