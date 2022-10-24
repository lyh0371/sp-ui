import { OutputOptions, rollup, OutputBundle, NormalizedOutputOptions } from 'rollup'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { epOutput, epPackage, spRoot, packagesRoot } from './paths'
import { excludeFiles, writeBundles, generateExternal } from './utils'
import { readJSON, writeJsonSync } from 'fs-extra'
// 不需要了
import postcss from 'rollup-plugin-postcss'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import DefineOptions from 'unplugin-vue-define-options/rollup'

import glob from 'fast-glob'
import { buildConfigEntries } from './build-info'
async function buildModules() {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: packagesRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const bundle = await rollup({
    input,
    plugins: [
      vue({
        isProduction: false
      }) as Plugin,
      DefineOptions(),
      vueJsx() as Plugin,
      postcss({
        extract: 'dist/build.css'
      }),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts']
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target: 'es2018',
        loaders: {
          '.vue': 'ts'
        }
      }),
      {
        name: 'addStyle',
        async generateBundle(output: NormalizedOutputOptions, bundle: OutputBundle) {
          for (const key in bundle) {
            if (key.startsWith('components/') && key.endsWith('/index.js')) {
              // @ts-ignore
              bundle[key].code = `${bundle[key].code}require("./index.css")`
            }
            if (key.startsWith('components/') && key.endsWith('/index.mjs')) {
              // @ts-ignore
              bundle[key].code = `${bundle[key].code}import "./index.css"`
            }
          }
        }
      }
    ],
    treeshake: false,
    external: await generateExternal({ full: false })
  })

  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true, // 让打包目录和我们目录对应
        preserveModulesRoot: spRoot,
        sourcemap: false,
        entryFileNames: `[name].${config.ext}`
      }
    })
  )
}

async function copyFiles() {
  const pkg = await readJSON(epPackage, 'utf-8')
  pkg['main'] = 'lib/index.js'
  pkg['module'] = 'es/index.mjs'
  pkg['types'] = 'es/index.d.ts'
  writeJsonSync(resolve(epOutput, 'package.json'), pkg, { spaces: 2 })
}

buildModules()
copyFiles()
