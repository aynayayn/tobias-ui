import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import dts from 'vite-plugin-dts'

const base = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vueJsx(),
    tsxResolveTypes(),
    vue(),
    dts({
      entryRoot: 'src',
      outDir: ['es', 'lib'],
      exclude: ['**/tests/**'],
    }),
  ],
  resolve: {
    // 需要识别tobias-ui别名
    // @tobias-ui/utils在rollupOptions.external中写了，作为外部库打入包中，不需要识别别名
    alias: [
      {
        find: /^tobias-ui/,
        replacement: resolve(base, 'src/'),
      },
    ],
  },
  build: {
    lib: {
      entry: './src/index.ts',
    },
    rollupOptions: {
      external: [
        '@floating-ui/vue',
        'vue',
        '@juggle/resize-observer',
        '@v-c/utils',
        'lodash-es',
        '@tobias-ui/utils',
        '@tobias-ui/icons',
      ],
      output: [
        // esm
        {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          format: 'esm',
          dir: 'es',
        },
        // cjs
        {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          exports: 'named',
          format: 'cjs',
          dir: 'lib',
        },
      ],
    },
  },
})
