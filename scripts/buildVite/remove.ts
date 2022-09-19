import { readJSON, writeJsonSync } from 'fs-extra'
import { resolve } from 'path'
import { buildOutput, epPackage } from 'scripts/build/paths'
async function copyFiles() {
  const pkg = await readJSON(epPackage, 'utf-8')
  pkg['main'] = 'lib/sp-ui/index.cjs'
  pkg['module'] = 'es/sp-ui/index.mjs'
  writeJsonSync(resolve(buildOutput, 'package.json'), pkg, { spaces: 2 })
}
copyFiles()
