import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 在写tsx代码时，该插件可以帮助实现使用类型props作为泛型参数的写法，而非一个个定义props属性的类型
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'

const base = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitepressDemo({
      glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
    tsxResolveTypes(),
  ],
  resolve: {
    alias: [
      {
        find: /^tobias-ui/,
        replacement: resolve(base, 'packages/tobias-ui/src/'),
      },
      {
        find: /^@tobias-ui\/utils/,
        replacement: resolve(base, 'packages/utils/src/'),
      },
    ],
  },
})
