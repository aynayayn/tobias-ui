import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const base = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: 'src',
      outDir: ['es', 'lib'],
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
    },
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js',
          format: 'esm',
          dir: 'es',
        },
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
  resolve: {
    alias: [
      {
        find: /^@tobias-ui\/icons/,
        replacement: resolve(base, 'src/'),
      },
    ],
  },
})
