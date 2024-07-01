import type { App } from 'vue'
import Input from 'tobias-ui/input/input.vue'

Input.install = (app: App) => {
  app.component(Input.name!, Input)
}

export default Input
