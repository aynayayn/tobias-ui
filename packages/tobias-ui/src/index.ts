import type { App, Plugin } from 'vue'
import pkg from '../package.json'
import * as components from './components'

// 为了按需导入 import { Button } from 'tobias-ui'; app.use(Button);
export * from './components'

// 为了全局导入 import TobiasUI from 'tobias-UI'; app.use(TobiasUI);
export default {
  install(app: App) {
    Object.entries(components).forEach(([_name, comp]) => {
      if (comp.install)
        app.use(comp as any)
    })
  },
  version: pkg.version,
} as Plugin
