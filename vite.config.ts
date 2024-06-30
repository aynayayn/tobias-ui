import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import alias from './alias'

// 在写tsx代码时，该插件可以帮助实现使用类型props作为泛型参数的写法，而非一个个定义props属性的类型

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
    alias,
  },
})
