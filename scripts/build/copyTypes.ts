import { copy } from 'fs-extra'
import { resolve } from 'path'
import { buildConfig, Module } from './build-info'
import { buildOutput } from './paths'

function copyTypes() {
  const src = resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) => copy(src, buildConfig[module].output.path, { recursive: true })
  copyTypes('esm')
  copyTypes('cjs')
}

copyTypes()
