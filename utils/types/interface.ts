import type { TweetSyndication } from "./syndication"

export interface TweetOembed {
  author_name: string
  author_url: string
  cache_age: string
  height: number | null
  html: string
  provider_name: string
  provider_url: string
  type: string
  url: string
  version: string
  width: number | null
}

export interface TweetOptions {
  layout?: string
  css?: string
  show_original_link?: boolean
  enable_twemoji?: boolean
  show_media?: boolean
  show_quoted_tweet?: boolean
  show_info?: boolean
}

export interface TweetQueryOptions extends TweetOptions {
  url?: string
}

export interface ExportOptions {
  css: string
}

export interface TweetContent {
  meta: {
    id?: string
    url?: string
    avatar?: {
      [key: string]: string
    }
    name?: string
    username?: string
    profile_url?: string
    created_at?: number
    heart_count?: string
    cta_type?: string
    cta_count?: string
    [key: string]: any
  }
  html: string
  quoted_tweet?: {
    id: string
    url: string
  }
  media_html?: string
}

export interface iTweetHTMLOptions {
  /**
   * Tweet Content
   */
  data: TweetSyndication,

  /**
   * Tweet Options
   */
  options: TweetOptions,
}

export interface iConstructHTMLOptions extends iTweetHTMLOptions {
  /**
   * Is the tweet a quoted tweet?
   * 
   * @default false
   */
  isQuotedTweet?: boolean
}
