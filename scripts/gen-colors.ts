import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { generate, gold, green, red } from '@ant-design/colors'

const colors = generate('#a1ca21')

let str = ''
colors.forEach((color, index) => {
  str += `--tobias-color-primary-${index + 1}: ${color};\n`
})
str += '\n'

green.forEach((color, index) => {
  str += `--tobias-color-success-${index + 1}: ${color};\n`
})
str += '\n'

gold.forEach((color, index) => {
  str += `--tobias-color-warning-${index + 1}: ${color};\n`
})
str += '\n'

red.forEach((color, index) => {
  str += `--tobias-color-error-${index + 1}: ${color};\n`
})
str += '\n'

const neutralColors = ['#000000E0', '#000000E0', '#000000A6', '#00000040', '#D9D9D9FF', '#FFFFFFD9', '#F5F5F5FF']
neutralColors.forEach((color, index) => {
  str += `--tobias-color-neutral-${index + 1}: ${color};\n`
})

const base = fileURLToPath(new URL('../', import.meta.url))
const cssFilePath = resolve(base, 'packages/tobias-ui/src/style/theme/colors.css')

writeFileSync(cssFilePath, `:root{\n${str}}`)
