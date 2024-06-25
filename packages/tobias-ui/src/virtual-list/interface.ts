export interface BasicType {
  arrPos: number // 数据项在整个列表中的索引位置
}

export interface ContentType extends BasicType {}

export interface PositionInfo extends BasicType {
  startPos: number // 当前数据dom的top位置
  endPos: number // 当前数据dom的bottom位置
  height: number // 当前数据dom的高度（初始值为猜测高度【预估高度】）
}
