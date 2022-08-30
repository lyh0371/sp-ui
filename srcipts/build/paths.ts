import { resolve } from 'path'
export const projRoot = resolve(__dirname, '..', '..')

export const packagesRoot = resolve(__dirname, '../../packages')
export const spRoot = resolve(packagesRoot, './sp-ui')
export const buildOutput = resolve(projRoot, 'dist')
export const epOutput = resolve(buildOutput, 'sp-ui')
export const epPackage = resolve(spRoot, 'package.json')
export const componentRoot = resolve(packagesRoot, 'components')
