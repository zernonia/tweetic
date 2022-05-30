import { App } from "vue"
import * as components from "./components"

// Default export is library as a whole, registered via Vue.use()
export default {
  install: (app: App) => {
    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component)
    })
  },
}

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "./components/index"

// export types
export * from "~~/interface"

// export composables
export * from "./composables"
