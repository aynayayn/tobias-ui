import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import fs from 'fs-extra'

const base = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  resolve: {
    // src/styles.less中使用了tobias-ui别名，需要使打包器对此进行识别
    alias: [
      {
        find: /^tobias-ui/,
        replacement: resolve(base, 'src'),
      },
    ],
  },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/styles.ts',
      formats: ['es'], // 这里可写另外的值，es也是随意写的
      fileName: () => 'tobias-ui-style.js',
    },
    rollupOptions: {
      output: {
        assetFileNames: () => 'tobias-ui.css',
      },
    },
  },
  plugins: [
    {
      name: 'remove:tobias-ui-style.js',
      // 本插件在打包结束之后（所有命令执行结束后）执行，目的是移除./dist/tobias-ui-style.js这个文件
      closeBundle() {
        const tobiasPath = fileURLToPath(new URL('./dist', import.meta.url))
        const styleFilePath = resolve(tobiasPath, 'tobias-ui-style.js')
        fs.removeSync(styleFilePath)
      },
    },
  ],
})
