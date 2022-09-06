import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx(), DefineOptions()],

  build: {
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        extend: true
      }
    },
    lib: {
      entry: './packages/sp-ui/index.ts',
      name: 'SpUi',
      formats: ['es', 'cjs']
    },

    outDir: './dist'
  }
})
