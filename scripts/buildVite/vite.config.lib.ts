import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import vueSetupExtend from 'unplugin-vue-setup-extend-plus/vite'
import { spRoot, buildOutput, packagesRoot } from '../build/paths'

const buildEs = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      insertTypesEntry: true, // 是否生成类型声明入口
      cleanVueFileName: true, // 是否将 '.vue.d.ts' 文件名转换为 '.d.ts'
      copyDtsFiles: true, // 是否将源码里的 .d.ts 文件复制到 outputDir
      include: [packagesRoot] // 手动设置包含路径的 glob
    }),
    vueSetupExtend()
  ],
  mode: 'production',
  build: {
    target: 'modules',
    minify: true,
    chunkSizeWarningLimit: 200,
    reportCompressedSize: false,
    emptyOutDir: false,
    outDir: resolve(buildOutput, 'lib'),
    lib: {
      entry: resolve(spRoot, 'index.ts'),
      formats: ['cjs'],
      fileName: () => 'index.cjs'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        preserveModules: true,
        exports: 'named'
      }
    }
  }
})

export default buildEs
