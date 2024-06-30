import type { AppContext, VNode } from 'vue'

export interface NotificationInfoParams {
  title: string | VNode
  content: string | VNode
  duration?: number
  appContext?: AppContext
}

export interface NotificationConfig extends NotificationInfoParams {
  id: string
  timer?: ReturnType<typeof setTimeout>
}

export interface NotificationInstance {
  add: (config: NotificationInfoParams) => (() => void)
}
