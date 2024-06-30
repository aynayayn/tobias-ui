import { defineConfig } from 'vitest/config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import alias from './alias'

export default defineConfig({
  plugins: [
    vueJsx(),
    tsxResolveTypes(),
    vue(),
  ],
  resolve: {
    alias,
  },
  test: {
    // 默认情况下，vitest 不显式提供全局 API。如果你更倾向于使用类似 jest 中的全局 API，可以将 --globals 选项传递给 CLI 或在配置中添加 globals: true。
    globals: true,
    // vitest中的默认测试环境是一个Node.js环境，如果你正在构建Web端应用，可以使用jsdom或happpy-dom这种类似浏览器（browser-like）的环境来替代Node.js。
    // 如果你正在构建边缘计算函数，你可以使用edge-runtime环境
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
