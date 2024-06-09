# Input

<demo src='./demos/basic.vue'></demo>

<demo src='./demos/size.vue'></demo>

<demo src='./demos/disabled.vue'></demo>

<demo src='./demos/slot.vue'></demo>

<demo src='./demos/instance-methods.vue'></demo>

<demo src='./demos/attrs-inherit.vue'></demo>

## 属性
| 属性名称 | 说明 | 类型 | 默认值 |
| ---- | ---- | :----: | :----: |
| size | 设置输入框的尺寸 | `default`\|`small`\|`large` | `default` |
| disabled | 设置输入框的禁用状态 | boolean | `false` |

## 事件
| 事件 | 说明 | 类型 |
| ---- | ---- | :----: |
| change | 使用时存在v-model绑定的情况下，输入框内容发生改变时触发 | `(e: Event) => void` |

## 插槽
| 插槽名称 | 说明 | 插槽参数 |
| ---- | ---- | :----: |
| prefix | 输入框左边内容填充插槽 | 无 |
| suffix | 输入框右边内容填充插槽 | 无 |
