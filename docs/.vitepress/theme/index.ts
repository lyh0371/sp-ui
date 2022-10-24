import { h } from 'vue'
import Theme from 'vitepress/theme'
import './styles/vars.css'
import spUi from '../../../packages/sp-ui'
import '../../../packages/sp-ui/index.scss'
import 'vitepress-theme-demoblock/theme/styles/index.css'
import './styles/demoblock.scss'
import './styles/font.css'
//@ts-ignore
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
//@ts-ignore
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'
export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.use(spUi)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  }
}
