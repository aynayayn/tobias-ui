import { defineComponent } from 'vue'
import type { HeaderProps } from 'tobias-ui/table/interface'
import { useClassnames } from '@tobias-ui/utils'

// 为defineComponent指定泛型参数，使用vite-plugin-tsx-resolve-types插件的能力生成对应类型的props实例
export const Header = defineComponent<HeaderProps>({
  name: 'Header',
  setup(props) {
    const { c } = useClassnames('table')

    return () => {
      const cellCls = [c('cell'), c('header', 'cell')]
      const renderColumns = () => {
        return (props.columns ?? []).map((column) => {
          return <th class={cellCls}>{column.title}</th>
        })
      }

      const cls = [c('header')]
      const rowCls = [c('header', 'row')]

      return (
        <thead class={cls}>
          <tr class={rowCls}>{renderColumns()}</tr>
        </thead>
      )
    }
  },
})
