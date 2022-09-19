import { parallel, series, TaskFunction } from 'gulp'
import { run, withTaskName } from './process'
const tasks: TaskFunction = series(
  parallel(
    withTaskName('buildCss', () => run('pnpm run build:css')),
    withTaskName('buildComponent', () => run('pnpm run build:component')),
    withTaskName('buildLib', () => run('pnpm run build:lib'))
  ),
  withTaskName('move', () => run('pnpm run move'))
)
export default tasks
