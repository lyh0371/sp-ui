import { OutputOptions, rollup } from 'rollup'
import { epOutput, epPackage, spRoot } from './paths'
import { excludeFiles, writeBundles } from './utils'
import { copyFile } from 'fs/promises'
import { resolve } from 'path'
// 不需要了
import postcss from 'rollup-plugin-postcss'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import glob from 'fast-glob'
import { buildConfigEntries } from './build-info'
async function buildModules() {
  const input = excludeFiles(
    await glob('*', {
      cwd: spRoot,
      absolute: true,
      onlyFiles: true
    })
  )
  const bundle = await rollup({
    input,
    plugins: [
      vue({
        isProduction: false
      }),
      postcss({
        extract: 'dist/build.css'
      }),
      vueJsx(),
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
      })
    ],
    treeshake: false,
    external: ['vue']
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

function copyFiles() {
  copyFile(epPackage, resolve(epOutput, 'package.json'))
}

buildModules()
copyFiles()
