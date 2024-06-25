# 虚拟滚动列表

<demo src='./demos/basic.vue'></demo>

<demo src='./demos/basic-translate.vue'></demo>

<demo src='./demos/basic-no-actual-height.vue'></demo>

## 属性
| 属性名称 | 说明 | 类型 | 默认值 |
| ---- | ---- | :----: | :----: |
| data | 列表数据 | `Record<string, any>[]` | `[]` |
| bufferCount | 缓冲区域列表项个数 | `number` | `5` |

## 事件
| 事件 | 说明 | 事件参数 |
| ---- | ---- | :----: |
| itemClick | 点击列表项区域触发的事件 | `[record: Record<string, any>, event: Event]` |

## 插槽
| 插槽名称 | 说明 | 插槽参数 |
| ---- | ---- | :----: |
| item | 列表的各项具体的渲染内容 | `{item: Record<string, any>; index: number}` |

