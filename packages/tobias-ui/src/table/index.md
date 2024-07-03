# Table 表格

<demo src='./demos/basic.vue'></demo>

<demo src='./demos/table-column.vue'></demo>

<demo src='./demos/cell-custom-render.vue'></demo>

<demo src='./demos/cell-use-slot.vue'></demo>

## 属性
| 属性名称 | 说明 | 类型 | 默认值 |
| ---- | ---- | :----: | :----: |
| columns | 表格的列信息 | `{title:string; key:string; render?:(params:{value:any; record:Record<string,any>}) => string \| VNode \| null \| undefined \| number; slot?:string}[]` | `[]` |
| data | 表格需要展示的数据 | `any[]` | `[]` |

## 插槽
| 插槽名称 | 说明 | 插槽参数 |
| ---- | ---- | :----: |
| default | 如果使用的是`t-table-column`组件，则会把所有`t-table-column`的props收集作为`columns`信息 | 无 |
| [cell-customized-slot] | 单元格内容自定义渲染插槽 | `{value: any; record: Record<string, any>}` |