import { parse } from "node-html-parser"
import { TweetOembed } from "~~/interface"

export const extractHtml = (data: string) => {
  const root = parse(data)
  const html = root.getElementsByTagName("p")?.[0]?.innerHTML
  return html
}
export const extractDate = (data: string) => {
  const root = parse(data)
  const html = root.querySelector(".twitter-tweet > a")?.innerHTML
  return html
}

export const constructHtml = (oembed: TweetOembed) => {
  const url = oembed.url
  const name = oembed.author_name
  const handler = `@${oembed.author_url.split("/")[3]}`
  const date = extractDate(oembed.html)
  const content = extractHtml(oembed.html)
  console.log({ url, name, handler, date })
  return content
}
