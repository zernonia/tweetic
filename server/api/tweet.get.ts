import { defu } from 'defu'
import { constructHtml, getSyndication } from "../_lib/parser"

import { getTwitterId } from '~~/utils/function'
import type { TweetOptions, TweetQueryOptions } from "~~/utils/types"


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
    if (!id) throw new Error('Invalid Twitter URL or not defined.');

    const options: TweetOptions = {
      layout: layout?.toString(),
      css: css?.toString(),
      enable_twemoji: JSON.parse(enable_twemoji.toString()),
      show_media: JSON.parse(show_media.toString()),
      show_quoted_tweet: JSON.parse(show_quoted_tweet.toString()),
      show_info: JSON.parse(show_info.toString()),
    }

    const data = await getSyndication(id.toString())
    
    return constructHtml({ data, options })
  } catch (error) {
    event.res.statusCode = 400
    return error
  }
})
