import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'

const base = fileURLToPath(new URL('../', import.meta.url))

export default defineConfig({
  plugins: [
    vueJsx(),
    tsxResolveTypes(),
    vue(),
  ],
  resolve: {
    // 需要识别@tobias-ui/utils别名
    alias: [
      {
        find: /^@tobias-ui\/utils/,
        replacement: resolve(base, './utils/src/'),
      },
    ],
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['umd'],
      fileName: () => 'tobias-ui.js',
      name: 'tobiasUI',
    },
    rollupOptions: {
      external: ['vue'], // 除了vue，其他的依赖都打到umd包中
      output: {
        exports: 'named',
        // external中的各项都需要在这里定义全局名称
        globals: {
          vue: 'vue',
        },
      },
    },
  },
})
