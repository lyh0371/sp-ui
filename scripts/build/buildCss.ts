import { parallel, src, dest } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import cleanCSS from 'gulp-clean-css'
import consola from 'consola'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import chalk from 'chalk'

import { buildCssOutPut, componentRoot } from './paths'
import { resolve } from 'path'
async function buildCss() {
  const sass = gulpSass(dartSass)
  // console.log(componentRoot)
  const sassRoot = resolve(componentRoot, '**/**/*.scss')

  return src(sassRoot)
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(`${chalk.cyan(details.name)}: ${chalk.yellow(details.stats.originalSize / 1000)} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`)
      })
    )
    .pipe(
      rename((path) => {
        const [name] = path.dirname.split('/')
        path.dirname = name
      })
    )
    .pipe(dest(buildCssOutPut))
}

export default parallel(buildCss)
