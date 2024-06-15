import { defineComponent } from 'vue'
import type { BodyProps } from 'tobias-ui/table/interface'
import { useClassnames } from '@tobias-ui/utils'
import { filterEmpty } from '@v-c/utils'

export const Body = defineComponent<BodyProps>({
  name: 'Body',
  // 在使用Body组件时，注意需要使用v-slots指令把TTable组件的插槽传进来
  setup(props, { slots }) {
    const { c } = useClassnames('table')

    return () => {
      const cellCls = [c('cell'), c('body', 'cell')]
      const renderRow = (rowData: Record<string, any>) => {
        return (props.columns ?? []).map((column) => {
          const cellRawValue = rowData[column.key]
          if (column.render) {
            return (
              <td class={cellCls}>
                {column.render({ value: cellRawValue, record: rowData })}
              </td>
            )
          }
          else if (column.slot && slots[column.slot]) {
            // 调用slots[column.slot]可以拿到一个VNode数组
            // 这里把{}传入slots[column.slotName]的调用中，是为了解决在定义插槽内容时传入了props导致slots[column.slotName]报错的bug
            const children = slots[column.slot]!({})
            // 把空节点过滤掉
            const noEmptyChildren = filterEmpty(children || [])
            if (noEmptyChildren.length) {
              return (
                <td>
                  {slots[column.slot]?.({ value: cellRawValue, record: rowData })}
                </td>
              )
            }

            return <td class={cellCls}>{cellRawValue}</td>
          }
          return <td class={cellCls}>{cellRawValue}</td>
        })
      }

      const rowCls = [c('body', 'row')]
      const renderBody = () => {
        return (props.data ?? []).map((record) => {
          return <tr class={rowCls}>{renderRow(record)}</tr>
        })
      }

      const cls = [c('body')]
      return (
        <tbody class={cls}>
          {renderBody()}
        </tbody>
      )
    }
  },
})
