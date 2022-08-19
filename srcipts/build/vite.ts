import { build, defineConfig, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import fs from 'fs-extra'
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
async function buildFn(compName) {
  const entry = resolve(componentRoot, compName, 'index.ts')
  const buildConfg = defineConfig({
    plugins: [vue()],
    build: {
      rollupOptions: {
        external: 'vue',
        output: {
          globals: {
            vue: 'Vue'
          },
          exports: 'named',
          extend: true
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
  })
  await build(buildConfg as InlineConfig)
}
fs.readdirSync(componentRoot).filter(isComponent).forEach(buildFn)
