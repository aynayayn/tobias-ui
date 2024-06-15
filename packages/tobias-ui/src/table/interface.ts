import type { VNode } from 'vue'

export interface ColumnType {
  title: string
  key: string
  render?: (params: { value: any; record: Record<string, any> }) => string | VNode | null | undefined | number
  slot?: string
}

// 表头
export interface HeaderProps {
  columns?: ColumnType[]
}

// 表体
export interface BodyProps extends HeaderProps {
  data?: any[]
}

// 整体表格
export interface TableProps extends HeaderProps, BodyProps {}
