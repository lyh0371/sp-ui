import Alert from './src/alert.vue'
import { App } from 'vue'

export { Alert }
export default {
  install(app: App) {
    app.component(Alert.name, Alert)
  }
}
