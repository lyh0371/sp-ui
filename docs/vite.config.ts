import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'

import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vueJsx(), DefineOptions()]
})
