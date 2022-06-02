import { TwitterApi } from "twitter-api-v2"
import { verify } from "../_lib/verify"
import { supabase } from "../_lib/supabase"

export default defineEventHandler(async (event) => {
  const authorized = verify(event)
  if (!authorized) return "Unauthorized"

  const { keyword } = useQuery(event)
  const twitterClient = new TwitterApi(useRuntimeConfig().TWITTER_BEARER_TOKEN)
  const roClient = twitterClient.readOnly

  const results = await roClient.v2.search(
    `${
      keyword ?? "supabase"
    } -is:reply (happy OR exciting OR wonderful OR excited OR favorite OR fav OR amazing OR incredible OR best OR good OR love) -paid -course -hour -join`,
    {
      expansions: "author_id",
      max_results: 100,
    }
  )

  const tweets = results.data.data.map((i) => {
    let author_name = results.data.includes.users.find((j) => j.id === i.author_id)?.username

    return {
      id: i.id,
      url: `${author_name}/status/${i.id}`,
      keyword,
      raw: i,
    }
  })

  const { data, error } = await supabase.from("wall_of_tweets").upsert(tweets)

  return {
    data,
    error,
  }
})
