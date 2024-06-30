import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const base = fileURLToPath(new URL('.', import.meta.url))

export default [
  {
    find: /^tobias-ui/,
    replacement: resolve(base, 'packages/tobias-ui/src/'),
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
