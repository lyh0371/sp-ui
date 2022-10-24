import { copy } from 'fs-extra'
import { resolve } from 'path'
import { buildConfig, Module } from './build-info'
import { buildOutput, epOutput } from './paths'

function copyCore(src: string, outputPath?: (path: string) => string) {
  const copyTypes = (module: Module) => copy(src, outputPath ? outputPath(module) : buildConfig[module].output.path, { recursive: true })
  copyTypes('esm')
  copyTypes('cjs')
}

function copyTypesFn() {
  const src = resolve(buildOutput, 'types/packages')
  copyCore(src)
}

function copyStyleFn() {
  const src = resolve(epOutput, 'styles')
  copyCore(src, (path) => {
    return resolve(epOutput, path === 'esm' ? 'es' : 'lib', 'components')
  })
}
// 拷贝文件
copyTypesFn()
// 拷贝css
copyStyleFn()
