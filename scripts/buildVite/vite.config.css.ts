import type { UserConfigExport } from 'vite'
import { componentRoot } from '../build/paths'
import { resolve } from 'path'
import { sync } from 'fast-glob'

const sassRoot = resolve(componentRoot, '**/**/*.scss')

console.log(sync(sassRoot))

export default (): UserConfigExport => {
  return {
    build: {
      assetsDir: 'style',
      rollupOptions: {
        input: sync(sassRoot),
        output: {
          assetFileNames: 'theme/[name].[ext]'
        }
      }
    }
  }
}
