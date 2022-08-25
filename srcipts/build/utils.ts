import { OutputOptions, RollupBuild } from 'rollup'
import type { ProjectManifest } from '@pnpm/types'
import { epPackage } from './paths'
export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'test', 'mock', 'package.json', 'dist']
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)))
}
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export const getPackageManifest = (pkgPath: string) => {
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (pkgPath: string): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  }
}
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage)
  return (id: string) => {
    const packages: string[] = peerDependencies
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}
