import { App } from 'vue'
import * as components from './component'
export function installer(app: App) {
  Object.entries(components).forEach(([key, value]): void => {
    app.component(key, value)
  })
}
