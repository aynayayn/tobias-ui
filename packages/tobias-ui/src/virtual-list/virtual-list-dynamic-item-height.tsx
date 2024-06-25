import type { PropType, StyleValue } from 'vue'
import { computed, defineComponent, onMounted, onUpdated, ref, watch } from 'vue'
import { useClassnames } from '@tobias-ui/utils'
import { ResizeObserver } from '@juggle/resize-observer'
import type { ContentType, PositionInfo } from 'tobias-ui/virtual-list/interface'
import { omit } from 'lodash-es'

export default defineComponent({
  name: 'TVirtualListDynamicItemHeight',
  props: {
    data: {
      type: Array as PropType<ContentType[]>,
      default: () => [],
    },
    bufferCount: {
      type: Number as PropType<number>,
      default: 5,
    },
  },
  emits: ['itemClick'],
  setup(props, { attrs, slots, emit }) {
    const { c } = useClassnames('virtual-list-dynamic-item-height')

    /**
     * 猜测高度（预估高度）
     * 这个数值需要比真实的每一项item的高度要小或者接近所有item高度的平均值
     * 数值过大可能会造成初始列表时endIndex的值为1，如果再把bufferCount设置成了0，则初始的时候列表项只会有1个
     * 需要设置得小一点
     */
    const MAYBE_HEIGHT = 20
    /**
     * 列表项的高度和位置信息
     */
    let positionInfos: PositionInfo[] = []

    const viewPortHeight = ref(0) // 可视区域高度
    const containerRef = ref<HTMLDivElement>()
    const contentListRef = ref<HTMLDivElement>()
    const allData = ref<ContentType[]>([])
    const scrollTop = ref(0) // 记录滚动高度
    const scrollContentHeight = ref(0) // 记录整个滚动列表的总高度
    const startIndex = ref(0) // 视口区域开始渲染的数据在allData数组中的索引位置
    const startOffset = ref(0) // translateY值，使用positionInfos[renderStartIndex.value].startPos来更新

    /**
     * 视口区域最后一个数据在allData数组中的索引位置
     */
    const endIndex = computed(() => {
      if (!allData.value.length || allData.value.length <= 0 || positionInfos.length <= 0)
        return 0

      let endPos = startIndex.value
      let contentDomTotalHeight = positionInfos[endPos].height

      while (contentDomTotalHeight < viewPortHeight.value) {
        endPos++
        contentDomTotalHeight += positionInfos[endPos].height
      }

      endPos += 1

      return endPos
    })

    // 缓冲区域开始渲染的数据在allData数组中的索引位置
    const renderStartIndex = computed(() => {
      return Math.max(0, startIndex.value - props.bufferCount)
    })

    // 缓冲区域最后一个渲染的数据在allData数组中的索引位置
    const renderEndIndex = computed(() => {
      return Math.min(positionInfos.length, endIndex.value + props.bufferCount)
    })

    /**
     * 需要渲染在视口区域 + 缓冲区域的数据
     */
    const renderData = computed(() => {
      return allData.value.slice(renderStartIndex.value, renderEndIndex.value)
    })

    // 监听props.data，生成allData数组和positionInfos数组
    watch(() => props.data, (val) => {
      containerRef.value && (containerRef.value.scrollTop = 0)
      scrollTop.value = 0

      startIndex.value = 0

      // 组件初始化执行这里的逻辑的时候，dom还没有渲染
      // console.log(containerRef.value)
      // console.log(contentListRef.value)
      positionInfos = val.map((_, index) => {
        return {
          arrPos: index,
          startPos: index * MAYBE_HEIGHT,
          endPos: (index + 1) * MAYBE_HEIGHT,
          height: MAYBE_HEIGHT,
        }
      })
      // 响应式数据allData的改变会触发endIndex的重新计算
      // endIndex -> renderEndIndex -> renderData
      // dom完成渲染（如果MAYBE_HEIGHT过大且props.bufferCount为0的情况下，可能只会渲染一个列表数据）
      allData.value = val.map((item, index) => {
        return {
          ...item,
          arrPos: index,
        }
      })
    }, {
      immediate: true,
      deep: true,
    })

    onMounted(() => {
      // dom完成渲染后，onMounted钩子开始执行
      // 保存视口容器的高度，并在onMounted钩子执行结束之后再次触发endIndex的计算
      viewPortHeight.value = containerRef.value?.offsetHeight ?? 0 // clientHeight offsetHeight

      // 监听containerRef的dom大小变化
      const resizeObserver = new ResizeObserver((entries) => {
        const con = entries[0]
        const { height } = con.contentRect
        viewPortHeight.value = height
      })
      resizeObserver.observe(containerRef.value!)

      // dom渲染完成后马上更新已渲染列表项的高度和位置信息
      updateHeightAndPos()
    })

    // dom元素改变后触发onUpdated钩子
    onUpdated(() => {
      // console.log('on updated')
      // props.data导致的allData改变之后，会引发滚动列表的第一次重新渲染，进而触发onUpdated钩子执行
      // 执行完updateHeightAndPos之后，会引发scrollContentHeight的改变，滚动列表会再一次渲染，进而触发onUpdated钩子执行
      // 执行完updateHeightAndPos之后，不再有响应式数据导致的dom重新渲染，onUpdated钩子不再执行
      updateHeightAndPos()
    })

    function updateHeightAndPos() {
      const contentListDom = contentListRef.value
      if (!contentListDom)
        return

      const childrenElementArr = contentListDom.children
      for (let i = 0; i < childrenElementArr.length; i++) {
        const childEle = childrenElementArr[i] as HTMLElement
        // 获取当前数据dom节点的数据在allData数组中的索引位置
        const dataIndexStr = childEle.dataset.index
        if (!dataIndexStr)
          continue

        const dataIndex = Number.parseInt(dataIndexStr)
        // 从allData中获取到该数据
        const dataItem = positionInfos[dataIndex]
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
          for (let j = dataIndex + 1; j < positionInfos.length; j++) {
            const jPosDataItem = positionInfos[j]
            // j位置的上一个位置的元素
            const jPrevPosDataItem = positionInfos[j - 1]

            jPosDataItem.startPos = jPrevPosDataItem.endPos
            jPosDataItem.endPos = jPrevPosDataItem.endPos + jPosDataItem.height
          }
        }
      }

      scrollContentHeight.value = positionInfos.length ? positionInfos[positionInfos.length - 1].endPos : 0

      updateStartInfo()
    }

    function handleScroll(e: Event) {
      const target = e.target as HTMLDivElement
      if (!target)
        return

      scrollTop.value = target.scrollTop

      updateStartInfo()
    }

    function updateStartInfo() {
      // 二分查找法查找positionInfos数组中第一个endPos大于scrollTop.value的元素的索引
      let left = 0
      let right = positionInfos.length - 1
      let tmpIndex = -1
      while (left < right) {
        const midIndex = Math.floor((left + right) / 2)
        const midValue = positionInfos[midIndex].endPos
        if (midValue === scrollTop.value) {
          tmpIndex = midIndex + 1
          break
        }

        else if (midValue < scrollTop.value) {
          left = midIndex + 1
        }

        else if (midValue > scrollTop.value) {
          if (tmpIndex === -1 || tmpIndex > midIndex)
            tmpIndex = midIndex

          right = midIndex
        }
      }
      startIndex.value = tmpIndex

      // 更新startOffset
      startOffset.value = positionInfos[renderStartIndex.value].startPos

      // let dataItem = positionInfos[index]
      // while (dataItem.endPos <= scrollTop.value) {
      //   index++
      //   dataItem = positionInfos[index]
      // }
    }

    function handleItemClick(record: Record<string, any>, e: Event) {
      emit('itemClick', record, e)
    }

    return () => {
      const renderVisualList = () => {
        const renderList = () => {
          const itemCls = [c(['scroll', 'E'], ['visualContent', 'E'], ['item', 'E'])]
          const itemDividerCls = c(['scroll', 'E'], ['visualContent', 'E'], ['item', 'E'], ['divider', 'E'])

          return renderData.value.map((item) => {
            const pureItem = omit(item, 'arrPos')
            const key = `${item.arrPos}`
            const handleClick = (e: Event) => {
              handleItemClick(pureItem as Record<string, any>, e)
            }

            return (
              <div key={key} class={itemCls} data-index={item.arrPos} onClick={handleClick}>
                {slots.item && slots.item({ item: pureItem, index: item.arrPos })}
                <div class={itemDividerCls}></div>
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
