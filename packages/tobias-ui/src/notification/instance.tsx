import type { AppContext, VNode } from 'vue'
import { h, render } from 'vue'
import Notification from 'tobias-ui/notification/notification'
import type { NotificationInfoParams, NotificationInstance } from 'tobias-ui/notification/interface'

export function createNotification() {
  let instance: NotificationInstance

  const init = (appContext?: AppContext) => {
    const body = document.body

    const vm: VNode = h(Notification, {
      onReady(_instance: NotificationInstance) {
        instance = _instance
      },
    })

    appContext && (vm.appContext = appContext)

    render(vm, body)
  }

  const info = (config: NotificationInfoParams) => {
    !instance && init(config.appContext)

    return instance?.add(config)
  }

  return { info }
}
