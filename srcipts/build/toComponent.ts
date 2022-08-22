import { build, BuildOptions } from 'vite'

import * as fs from 'fs-extra'
import { resolve } from 'path'
// 实现按需打包
const componentRoot = resolve(__dirname, '../../packages/components')
function isComponent(dirName: string) {
  const compDirPath = resolve(componentRoot, dirName)
  const isDir = fs.lstatSync(compDirPath).isDirectory()
  const haveIndex = isDir && fs.readdirSync(compDirPath).includes('index.ts')
  return isDir && haveIndex
}

// 打包执行函数
async function buildFn(compName: string) {
  const entry = resolve(componentRoot, compName)

  const buildConfg: BuildOptions = {
    rollupOptions: {
      output: {
        exports: 'named'
      }
    },
    lib: {
      entry,
      name: compName,
      fileName: 'index',
      formats: ['es', 'iife', 'umd', 'cjs']
    },
    outDir: `./dist/components/${compName}`
  }
  await build({
    build: buildConfg
  })
}
fs.readdirSync(componentRoot).filter(isComponent).forEach(buildFn)
