import { obtainCss } from "~~/function"

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { html } = await $fetch("/api/tweet", { params: { ...query, css: "" } })
  const css = obtainCss({ css: "", layout: query.layout?.toString() })

  if (html) {
    return `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>HTML inside SVG</title>
          <style type="text/css"></style>

        </head>
        <body> 
          <svg width="500" height="100%">
            <g>
              <foreignobject class="node" x="0" y="0" width="100%" height="100%" >
                ${html}                                  
              </foreignobject>
            </g>
          </svg> 
        </body>

        ${css}

        <script>
          const svg = document.querySelector('svg');
          const tweetBox = document.querySelector('.tweet').getBoundingClientRect()
          svg.setAttribute("height", tweetBox.height + "px");
          svg.setAttribute("width", tweetBox.width + "px");
        </script>
      </html>
    `
  } else {
    return "no!"
  }
})
