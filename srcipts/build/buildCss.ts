import { parallel, src, dest } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import cleanCSS from 'gulp-clean-css'

import { epOutput, componentRoot } from './paths'
import { resolve } from 'path'
async function buildCss() {
  const sass = gulpSass(dartSass)
  // console.log(componentRoot)
  const sassRoot = resolve(componentRoot, '**/**/*.scss')
  return src(sassRoot)
    .pipe(sass.sync())
    .pipe(
      cleanCSS({}, (deta) => {
        console.log('---', deta.name)
      })
    )
    .pipe(dest(epOutput))
}

export default parallel(buildCss)
