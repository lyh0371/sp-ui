import { createApp } from 'vue'
import './style.css'
import App from './play.vue'
import SpUi from '../../packages/sp-ui'
const app = createApp(App)
import '../../packages/sp-ui/index.scss'
app.use(SpUi)
app.mount('#app')
