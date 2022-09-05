import { Project } from 'ts-morph'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { mkdir, readFile, writeFile } from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import glob from 'fast-glob'
import consola from 'consola'
import chalk from 'chalk'

import { buildOutput, spRoot, packagesRoot, projRoot } from './paths'
import { resolve, relative, dirname } from 'path'
import { excludeFiles } from './utils'
import { Module } from './build-info'
const outDir = resolve(buildOutput, 'types')
const TSCONFIG_PATH = resolve(projRoot, 'tsconfig.web.json')
async function buildType() {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true
  })
  const sourceFiles = await addSourceFiles(project)
  typeCheck(project)
  await project.emit({
    emitOnlyDtsFiles: true
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = relative(packagesRoot, sourceFile.getFilePath())
    consola.trace(chalk.yellow(`Generating definition for file: ${chalk.bold(relativePath)}`))

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()

    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${chalk.bold(relativePath)}`)
    }
    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(dirname(filepath), {
        recursive: true
      })
      await writeFile(filepath, pathRewriter('esm')(outputFile.getText()), 'utf8')
      consola.success(chalk.green(`Definition for file: ${chalk.bold(relativePath)} generated`))
    })

    await Promise.all(subTasks)
  })
  await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(resolve(projRoot, 'env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile, '!sp-ui/**/*'], {
      cwd: packagesRoot,
      absolute: true,
      onlyFiles: true
    })
  )

  const epPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: spRoot,
      onlyFiles: true
    })
  )
  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const hasTsNoCheck = content.includes('@ts-nocheck')

        const sfc = vueCompiler.parse(content)

        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = (hasTsNoCheck ? '// @ts-nocheck\n' : '') + (script?.content ?? '')

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx'
            })
            content += compiled.content
          }

          const lang = scriptSetup?.lang || script?.lang || 'js'

          const sourceFile = project.createSourceFile(`${relative(process.cwd(), file)}.${lang}`, content)
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
    ...epPaths.map(async (file) => {
      const content = await readFile(resolve(spRoot, file), 'utf-8')
      sourceFiles.push(project.createSourceFile(resolve(packagesRoot, file), content))
    })
  ])
  return sourceFiles
}

function pathRewriter(module: Module) {
  // const config = buildConfig[module]
  return (id: string) => {
    // id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
    // id = id.replaceAll(`${PKG_PREFIX}/`, `${config.bundle.path}/`)
    return id
  }
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}

buildType()
