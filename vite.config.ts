import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],

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
      entry: './packages/index.ts',
      name: 'SpUi',
      formats: ['es', 'cjs']
    },

    outDir: './dist'
  }
})
