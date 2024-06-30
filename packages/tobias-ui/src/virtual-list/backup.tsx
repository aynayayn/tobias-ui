import type { PropType, StyleValue } from 'vue'
import { computed, defineComponent, onMounted, onUpdated, ref, watch } from 'vue'
import { useClassnames } from '@tobias-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'

// import type { ContentType, VirtualItem } from 'tobias-ui/virtual-list/interface'

// 这是一个在双重循环中频繁操作响应式数组数据导致列表滚动交互比较卡顿的例子

interface ContentType {
  id: number | string
  title: string
  content: string
}

interface VirtualItem<T> {
  data: T // 数据
  arrPos: number // 当前数据在整个列表中的索引位置
  startPos: number // 当前数据dom的top位置
  endPos: number // 当前数据dom的bottom位置
  height: number // 当前数据dom的高度（初始值为猜测高度【预估高度】）
}

export default defineComponent({
  name: 'TVirtualListNoActualItemHeight',
  props: {
    data: {
      type: Array as PropType<ContentType[]>,
      default: () => [],
    },
    cacheCount: {
      type: Number as PropType<number>,
      default: 5,
    },
  },
  emits: ['itemClick'],
  setup(props, { attrs, slots, emit }) {
    const { c } = useClassnames('virtual-list-no-actual-item-height')

    /**
     * 猜测高度（预估高度）
     */
    const MAYBE_HEIGHT = 100

    const viewPortHeight = ref(0)
    const containerRef = ref()
    const contentListRef = ref()
    const allData = ref<VirtualItem<ContentType>[]>([])
    const scrollTop = ref(0)

    /**
     * 整个滚动列表的高度，取allData最后一个元素的endPos值，allData无元素则置0
     */
    const scrollContentHeight = computed(() => {
      const data = allData.value
      const { length } = data
      return length > 0 ? data[length - 1].endPos : 0
    })

    /**
     * 可视区域开始渲染的数据在allData数组中的索引位置
     */
    const startIndex = computed(() => {
      let index = 0
      const dataList = allData.value
      let dataItem = dataList[index]
      while (dataItem.endPos <= scrollTop.value) {
        index++
        dataItem = dataList[index]
      }

      return index
    })

    /**
     * 当前视口最后一个数据在allData数组中的索引位置
     */
    const endIndex = computed(() => {
      if (!allData.value.length || allData.value.length <= 0)
        return 0

      const tmpAllData = allData.value
      let endPos = startIndex.value
      let contentDomTotalHeight = tmpAllData[endPos].height

      while (contentDomTotalHeight < viewPortHeight.value) {
        endPos++
        contentDomTotalHeight += tmpAllData[endPos].height
      }

      endPos += 1

      return endPos
    })

    const renderStartIndex = computed(() => {
      return Math.max(0, startIndex.value - props.cacheCount)
    })

    const renderEndIndex = computed(() => {
      return Math.min(allData.value.length, endIndex.value + props.cacheCount)
    })

    const startOffset = computed(() => {
      return allData.value[renderStartIndex.value].startPos
    })

    /**
     * 需要渲染在可见区域（视口）+缓冲区域的数据
     */
    const renderData = computed(() => {
      return allData.value.slice(renderStartIndex.value, renderEndIndex.value)
    })

    // 监听props.data，生成allData数组
    watch(() => props.data, (val) => {
      allData.value = val.map((item, index) => {
        return {
          data: item,
          arrPos: index,
          startPos: index * MAYBE_HEIGHT,
          endPos: (index + 1) * MAYBE_HEIGHT,
          height: MAYBE_HEIGHT,
        }
      })
    }, {
      immediate: true,
      deep: true,
    })

    onMounted(() => {
      // 保存视口容器的高度
      viewPortHeight.value = containerRef.value?.clientHeight ?? 0 // clientHeight offsetHeight

      // 监听containerRef的dom大小变化
      const resizeObserver = new ResizeObserver((entries) => {
        const con = entries[0]
        const { height } = con.contentRect
        viewPortHeight.value = height
      })
      resizeObserver.observe(containerRef.value)
    })

    // 被收集的响应式变量改变时，会执行该钩子
    onUpdated(() => {
      updateHeightAndPos()
    })

    function updateHeightAndPos() {
      const contentListDom = contentListRef.value
      if (!contentListDom)
        return

      const childrenElementArr = contentListDom.children
      const dataList = allData.value
      for (let i = 0; i < childrenElementArr.length; i++) {
        const childEle = childrenElementArr[i] as HTMLElement
        // 获取当前数据dom节点的数据在allData数组中的索引位置
        const dataIndexStr = childEle.dataset.index
        if (!dataIndexStr)
          continue

        const dataIndex = Number.parseInt(dataIndexStr)
        // 从allData中获取到该数据
        const dataItem = dataList[dataIndex]
        if (!dataItem)
          continue

        // 获取元素的实际高度
        const { offsetHeight: height } = childEle
        const oldHeight = dataItem.height

        /**
         * 计算当前数据dom元素的旧高度和当前高度的差值
         * 如：
         * oldHeight为100px，height为50px，那么dffVal为100-50=50px
         * oldHeight为50px，height为100px，那么dffVal为50-100=-50px
         */
        const dffVal = oldHeight - height
        if (dffVal !== 0) {
          dataItem.height = oldHeight - dffVal
          dataItem.endPos = dataItem.endPos - dffVal
          for (let j = dataIndex + 1; j < dataList.length; j++) {
            const jPosDataItem = dataList[j]
            // j位置的上一个位置的元素
            const jPrevPosDataItem = dataList[j - 1]

            jPosDataItem.startPos = jPrevPosDataItem.endPos
            jPosDataItem.endPos = jPrevPosDataItem.endPos + jPosDataItem.height
          }
        }
      }

      allData.value = dataList
    }

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
          const itemCls = [c(['scroll', 'E'], ['visualContent', 'E'], ['item', 'E'])]

          return renderData.value.map((item, index) => {
            const key = `${renderStartIndex.value + index}`
            const handleClick = (e: Event) => {
              handleItemClick(item.data as Record<string, any>, e)
            }

            return (
              <div key={key} class={itemCls} data-index={item.arrPos} onClick={handleClick}>
                {slots.item && slots.item({ item: item.data })}
              </div>
            )
          })
        }

        const visualListContainerStyle: StyleValue = {
          transform: `translateY(${startOffset.value}px)`,
        }
        const scrollVisualContentCls = [c(['scroll', 'E'], ['visualContent', 'E'])]
        return (
          <div ref={contentListRef} style={visualListContainerStyle} class={scrollVisualContentCls}>
            {renderList()}
          </div>
        )
      }

      const cls = [c()]
      const scrollDivCls = [c(['scroll', 'E'])]
      const scrollContentStyle: StyleValue = {
        height: `${scrollContentHeight.value}px`,
      }

      return (
        <div ref={containerRef} {...attrs} class={cls} onScroll={handleScroll}>
          <div style={scrollContentStyle} class={scrollDivCls}>
            {renderVisualList()}
          </div>
        </div>
      )
    }
  },
})
