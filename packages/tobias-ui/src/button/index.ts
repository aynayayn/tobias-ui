import type { App } from 'vue'
import Button from 'tobias-ui/button/button.vue'

Button.install = (app: App) => {
  app.component(Button.name!, Button)
}

export default Button
