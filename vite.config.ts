import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: 'vue',
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
      formats: ['es', 'iife', 'umd', 'cjs']
    },

    outDir: './dist'
  }
})
