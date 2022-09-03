import { resolve } from 'path'
import { epOutput } from './paths'
export const modules = ['esm', 'cjs'] as const
export type Module = typeof modules[number]
import type { ModuleFormat } from 'rollup'
export interface BuildInfo {
  module: 'ESNext' | 'CommonJS'
  format: ModuleFormat
  ext: 'mjs' | 'cjs' | 'js'
  output: {
    /** e.g: `es` */
    name: string
    /** e.g: `dist/element-plus/es` */
    path: string
  }

  bundle: {
    /** e.g: `element-plus/es` */
    path: string
  }
}
export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: resolve(epOutput, 'es')
    },
    bundle: {
      path: `es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: resolve(epOutput, 'lib')
    },
    bundle: {
      path: `lib`
    }
  }
}
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries

export type BuildConfigEntries = [Module, BuildInfo][]
