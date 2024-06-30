import type { App, Plugin } from 'vue'
import { createNotification } from './instance'

const instance = createNotification();

(instance as unknown as Plugin).install = (app: App) => {
  // 将Notification组件实例加入到vue的全局属性中
  app.config.globalProperties.$notification = instance
  // option api
  // this.$notification.info({})
}

export default instance
