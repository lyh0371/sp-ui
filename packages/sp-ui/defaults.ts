import { App } from 'vue'
import components from './component'
export function installer(app: App) {
  components.forEach((component) => app.use(component))
}
