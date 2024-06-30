import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import tsxResolveTypes from 'vite-plugin-tsx-resolve-types'
import dts from 'vite-plugin-dts'

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
