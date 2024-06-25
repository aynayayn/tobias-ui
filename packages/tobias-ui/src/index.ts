import type { App, Plugin } from 'vue'
import * as components from 'tobias-ui/components'
import pkg from '../package.json'

// 为了按需导入 import { Button } from 'tobias-ui'; app.use(Button);
export * from 'tobias-ui/components'

// 为了全局导入 import TobiasUI from 'tobias-UI'; app.use(TobiasUI);
export default {
  install(app: App) {
    Object.entries(components).forEach(([_name, comp]) => {
      if ((comp as unknown as Plugin).install)
        app.use(comp as any)
    })
  },
  version: pkg.version,
} as Plugin
