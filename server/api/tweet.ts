import { defu } from 'defu'
import { TweetOptions, TweetQueryOptions } from "~~/utils/types"
import { constructHtml, getSyndication, getTweetContent } from "../_lib/parser"

// Create Capture Group for twitter url.
const getTwitterId = (url: string): string | boolean => {
  let match = url.match(/(https:\/\/twitter.com)|([0-9]+)/g)
  if (match && match.length === 2) {
    return match[1]
  }
  return false
}

export default defineEventHandler(async (event) => {
  try {
    const query: TweetQueryOptions = useQuery(event)
    const { url, layout, css, enable_twemoji, show_media, show_quoted_tweet, show_info } = defu(query, { 
      enable_twemoji: false, 
      show_media: false, 
      show_quoted_tweet: false, 
      show_info: false
    })
  
    const id = getTwitterId(url)
    // Check valid twitter id
    if (!id) throw new Error('Invalid Twitter URL or not defined.')

    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      enable_twemoji: JSON.parse(enable_twemoji.toString()),
      show_media: JSON.parse(show_media.toString()),
      show_quoted_tweet: JSON.parse(show_quoted_tweet.toString()),
      show_info: JSON.parse(show_info.toString()),
    }

    const data = await getSyndication(id.toString())
    const { html, meta } = constructHtml(data, options)
    return { html, meta }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})
