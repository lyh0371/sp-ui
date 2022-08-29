import { build, BuildOptions } from 'vite'

import * as fs from 'fs-extra'
import { resolve } from 'path'
import { epOutput, spRoot } from './paths'
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
  const buildConfg: BuildOptions = {
    cssCodeSplit: true,
    rollupOptions: {
      output: [
        {
          format: 'es',
          exports: 'named',
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].mjs',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(epOutput, 'es'),
          preserveModulesRoot: spRoot
        },
        {
          format: 'cjs',
          exports: undefined,
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          //配置打包根目录
          dir: resolve(epOutput, 'lib'),
          preserveModulesRoot: spRoot
        }
      ]
    }
  }
  await build({
    build: buildConfg,
    plugins: [
      // {
      //   name: 'addStyle',
      //   generateBundle(config, bundle: any) {
      //     for (const key in bundle) {
      //       if (key === 'index.js') {
      //         bundle[key].code = `${bundle[key].code}require("./style.css")`
      //       }
      //       if (key === 'index.mjs') {
      //         bundle[key].code = `${bundle[key].code}import "./style.css"`
      //       }
      //     }
      //   }
      // }
    ]
  })
}
fs.readdirSync(componentRoot).filter(isComponent).forEach(buildFn)
