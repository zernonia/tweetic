import { parse } from "node-html-parser"
import { obtainCss } from "~~/function"

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const res = event.res
  try {
    const { html } = await $fetch("/api/tweet", { params: { ...query, css: "" } })
    const root = parse(html)
    root.querySelector(".tweet").setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    const parsedXHTML = root.innerHTML
      .replaceAll("\n", "")
      .replaceAll("\\", "")
      .replace(/(<img\b(?:[^<>"'\/]+|'[^']*'|"[^"]*")*)>/gi, "$1 />")
      .replace(/(<br\b(?:[^<>"'\/]+|'[^']*'|"[^"]*")*)>/gi, "$1 />")

    const css = obtainCss({ css: "", layout: query.layout?.toString() })

    if (html) {
      res.setHeader("Content-Type", "image/svg+xml")
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400px" height="100%">
 
          <foreignObject class="node" x="0" y="0" width="100%" height="100%" >
          ${parsedXHTML}
          </foreignObject>                        

          ${css}

          <script>
          const svg = document.querySelector('svg');
          const tweetBox = document.querySelector('.tweet')?.getBoundingClientRect()
          svg.setAttribute("height", tweetBox.height + "px");
          svg.setAttribute("width", tweetBox.width + "px");
        </script> 
      </svg>
    `
    }
  } catch (err) {
    res.statusCode = 400
    return err
  }
})
