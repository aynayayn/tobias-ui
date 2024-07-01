import type { App } from 'vue'
import Tooltip from 'tobias-ui/tooltip/tooltip'

Tooltip.install = (app: App) => {
  app.component(Tooltip.name!, Tooltip)
}

export default Tooltip
