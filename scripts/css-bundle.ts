import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import less from 'less'

const mainLibDir = new URL('../packages/tobias-ui', import.meta.url)

const mainLibPath = fileURLToPath(mainLibDir)

const lessFiles = fg.sync([
  'src/**/style/index.less',
  '!src/style', // 不去查找../packages/tobias-ui/src/style目录
], {
  cwd: mainLibPath,
})

async function compile() {
  for (const file of lessFiles) {
    // 取得完整路径
    const filePath = path.resolve(mainLibPath, file)
    // 读文件内容
    const lessCode = fs.readFileSync(filePath, 'utf-8')

    // less转css
    const cssCode = await less.render(lessCode, {
      paths: [path.dirname(filePath)],
    })

    // 准备写入内容的文件的路径
    const esDir = path.resolve(mainLibPath, `./es${file.slice(3, file.length - 4)}css`)
    const libDir = path.resolve(mainLibPath, `./lib${file.slice(3, file.length - 4)}css`)

    // 写入内容
    fs.outputFileSync(esDir, cssCode.css)
    fs.outputFileSync(libDir, cssCode.css)
  }
}

compile()
