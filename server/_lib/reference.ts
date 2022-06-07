import { TweetOptions } from "~~/utils/types"

const tailwindClassDefaultReference = {
  tweet: "w-[500px] p-8 text-black border border-gray-200 bg-white rounded-2xl",
  "tweet-header": " flex items-center justify-between",
  "tweet-author": "relative flex items-center",
  "tweet-author-image": "w-12 h-12 rounded-full",
  "tweet-author-title": "flex items-center",
  "tweet-author-info": "ml-4",
  "tweet-author-name": "font-medium",
  "tweet-author-verified": "ml-1 w-5 h-5 text-blue-400",
  "tweet-author-handler": "text-blue-400",
  "tweet-logo": "text-blue-400",
  "tweet-content": "mt-4",
  "tweet-content-link": "text-blue-400",
}
const tailwindClassSupabaseReference = {
  tweet: "w-[400px] p-8 text-black border border-gray-200 bg-white rounded-2xl",
  "tweet-header": " flex items-center justify-between",
  "tweet-author": "relative flex items-center",
  "tweet-author-image": "w-12 h-12 rounded-full",
  "tweet-author-info": "ml-4",
  "tweet-author-name": "font-medium",
  "tweet-author-handler": "text-blue-400",
  "tweet-logo": "bg-blue-400 text-white w-5 h-5 absolute -top-1 -left-2 rounded-full p-[0.2rem]",
  "tweet-content": "mt-4",
  "tweet-content-link": "text-blue-400",
}

export const mapClass = (key: string, options: TweetOptions): string => {
  if (options.css == "tailwind") {
    return options.layout == "supabase" ? tailwindClassSupabaseReference[key] : tailwindClassDefaultReference[key]
  } else return key
}
