import { TwitterApi } from "twitter-api-v2"
import { verify } from "../_lib/verify"
import { supabase } from "../_lib/supabase"

export default defineEventHandler(async (event) => {
  const authorized = verify(event)
  if (!authorized) return "Unauthorized"

  const { keyword } = useQuery(event)
  const twitterClient = new TwitterApi(useRuntimeConfig().TWITTER_BEARER_TOKEN)
  const roClient = twitterClient.readOnly

  const results = await roClient.v2.search(`${keyword ?? "supabase"} lang:en -is:retweet -is:reply -is:quote`, {
    expansions: "author_id",
    max_results: 100,
    "tweet.fields": "created_at",
  })

  const tweets = results.data.data.map((i) => {
    let author = results.data.includes.users.find((j) => j.id === i.author_id)
    let id = i.id
    delete i.id
    delete i.author_id
    return {
      id,
      keyword,
      metadata: {
        ...i,
        author,
      },
    }
  })

  const { data, error } = await supabase.from("tweets").upsert(tweets)

  return {
    data,
    error,
  }
})
