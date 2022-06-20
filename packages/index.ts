import { getSyndication, constructHtml } from "~~/utils/_lib"
import { TweetOptions } from "~~/utils/types"

const defaultOptions: TweetOptions = {
  layout: "",
  css: "",
  enable_twemoji: true,
  show_media: true,
  show_quoted_tweet: true,
  show_info: true,
}

export const fetchStaticTweet = async (tweetId: string, options = defaultOptions) => {
  try {
    const data = await getSyndication(tweetId)
    return constructHtml(data, options)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

export * from "~~/utils/types"
export * from "~~/utils/_lib"
