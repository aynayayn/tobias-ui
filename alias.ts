import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const base = fileURLToPath(new URL('.', import.meta.url))

export default [
  {
    find: /^tobias-ui/,
    replacement: resolve(base, 'packages/tobias-ui/src/'), // path.resolve将一系列路径或路径片段解析为绝对路径
  },
  {
    find: /^@tobias-ui\/utils/,
    replacement: resolve(base, 'packages/utils/src/'),
  },
  {
    find: /^@tobias-ui\/icons/,
    replacement: resolve(base, 'packages/icons/src/'),
  },
]
