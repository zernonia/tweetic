import { parse } from "node-html-parser"

export const extractHtml = (data: string) => {
  const root = parse(data)

  return root.getElementsByTagName("p")[0].innerHTML
}
