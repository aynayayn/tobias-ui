import { defineComponent, isVNode } from 'vue'
import { filterEmpty, isBaseType } from '@v-c/utils'
import { useClassnames } from '@tobias-ui/utils'
import { Body } from 'tobias-ui/table/components/body'
import { Header } from 'tobias-ui/table/components/header'
import type { TableProps } from 'tobias-ui/table/interface'

export default defineComponent<TableProps>({
  name: 'TTable',
  setup(props, { slots }) {
    const { c } = useClassnames('table')

    return () => {
      const children = filterEmpty(slots.default?.() || [])
      const myColumns: any[] = props.columns ?? []

      // 优先使用props中的columns
      // 如果使用TTable组件时没有传递columns，则去slots中查找是否有TableColumn组件，如果有，则收集TableColumn组件的props
      if (myColumns?.length < 1) {
        // 清空myColumns
        myColumns.length = 0
        children.forEach((child) => {
          if (isBaseType(child) || !isVNode(child))
            return

          const props = child.props
          const type = child.type as any
          if (type?.displayName && type?.displayName === 'TTableColumn')
            myColumns.push(props)
        })
      }

      const cls = [c()]

      // 在tsx中向子组件传递插槽的方式：使用v-slots指令
      return (
        <table class={cls}>
          <Header columns={myColumns} v-slots={slots} />
          <Body columns={myColumns} data={props.data} v-slots={slots} />
        </table>
      )
    }
  },
})
