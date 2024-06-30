import { createNotification } from 'tobias-ui/notification/instance'
import type { App, Plugin } from 'vue'

const instance = createNotification();

(instance as unknown as Plugin).install = (app: App) => {
  // 将Notification组件实例加入到vue的全局属性中
  app.config.globalProperties.$notification = instance
  // option api
  // this.$notification.info({})
}

export default instance
