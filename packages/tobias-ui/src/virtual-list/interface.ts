export interface BasicType {
  arrPos: number // 数据项在整个列表中的索引位置
}

export interface ContentType extends BasicType {}

export interface PositionInfo extends BasicType {
  startPos: number // 当前数据项对应的dom的top属性值
  endPos: number // 当前数据项对应的dom的bottom属性值
  height: number // 当前数据项对应的dom的高度（初始值为猜测高度【预估高度】）
}
