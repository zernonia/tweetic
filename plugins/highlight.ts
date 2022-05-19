import hljs from "highlight.js/lib/core"
import json from "highlight.js/lib/languages/json"
import html from "highlight.js/lib/languages/xml"
import css from "highlight.js/lib/languages/css"
import "highlight.js/styles/base16/github.css"

export default defineNuxtPlugin(() => {
  hljs.registerLanguage("json", json)
  hljs.registerLanguage("html", html)
  hljs.registerLanguage("css", css)

  return {
    provide: {
      hljs,
    },
  }
})
