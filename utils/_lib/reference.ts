import { TweetOptions } from "~~/utils/types"

const tailwindClassBasic = {
  "tweet-header": " flex items-center justify-between",
  "tweet-author": "relative flex items-center",
  "tweet-author-image": "w-12 h-12 rounded-full",
  "tweet-author-info": "ml-4",
  "tweet-author-name": "font-medium",
  "tweet-author-handler": "text-blue-400",
  "tweet-content": "mt-4",
  "tweet-content-link": "text-blue-400",
  "tweet-info": "mt-4 text-sm flex items-center text-slate-400",
  "tweet-info-favourite": "w-5 h-5 mr-2",
  "tweet-info-date": "ml-4",
}

const tailwindClassDefaultReference = {
  ...tailwindClassBasic,
  tweet: "w-[500px] p-8 text-black border border-gray-200 bg-white rounded-2xl",
  "tweet-author-title": "flex items-center",
  "tweet-author-verified": "ml-1 w-5 h-5 text-blue-400",
  "tweet-logo": "text-blue-400",
}
const tailwindClassSupabaseReference = {
  ...tailwindClassBasic,
  tweet: "w-[400px] p-8 text-black border border-gray-200 bg-white rounded-2xl",
  "tweet-logo": "bg-blue-400 text-white w-5 h-5 absolute -top-1 -left-2 rounded-full p-[0.2rem]",
}

export const mapClass = (key: string, options: TweetOptions): string => {
  if (options.css == "tailwind") {
    // @ts-ignore
    return options.layout == "supabase" ? tailwindClassSupabaseReference[key] : tailwindClassDefaultReference[key]
  } else return key
}
