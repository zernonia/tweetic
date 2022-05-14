import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import html from "highlight.js/lib/languages/xml"
import "highlight.js/styles/base16/github.css"

export default defineNuxtPlugin(() => {
  hljs.registerLanguage("json", json)
  hljs.registerLanguage("html", html)

  return {
    provide: {
      hljs,
    },
  }
})
