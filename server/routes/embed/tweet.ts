import { obtainCss } from "~~/function"

export default defineEventHandler(async (event) => {
  const query = useQuery(event)
  const { html } = await $fetch("/api/tweet", { params: { ...query, css: "" } })
  const css = obtainCss({ css: "", layout: query.layout?.toString() })

  if (html) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500" height="100%">
        <g>
          <foreignobject class="node" x="0" y="0" width="100%" height="100%" >
            ${html}                                  
            ${css}
    
            <script>
              const svg = document.querySelector('svg');
              const tweetBox = document.querySelector('.tweet').getBoundingClientRect()
              svg.setAttribute("height", tweetBox.height + "px");
              svg.setAttribute("width", tweetBox.width + "px");
            </script> 
          </foreignobject>
        </g>
      </svg>
    `
  } else {
    return "no!"
  }
})
