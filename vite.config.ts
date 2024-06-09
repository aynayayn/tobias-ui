import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { vitepressDemo } from 'vite-plugin-vitepress-demo'
import vueJsx from '@vitejs/plugin-vue-jsx'

const base = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitepressDemo({
      glob: ['**/demos/*.vue'],
    }),
    vueJsx(),
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
