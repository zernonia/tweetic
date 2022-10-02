import { serverSupabaseClient } from "#supabase/server";
import { TwitterApi } from "twitter-api-v2";
import { verify } from "../_lib/verify";

export default defineEventHandler(async (event) => {
  try {
    verify(event);

    const { keyword } = useQuery(event);
    const { TWITTER_BEARER_TOKEN } = useRuntimeConfig();

    if (!TWITTER_BEARER_TOKEN) throw new Error("Missing Twitter Bearer Token");

    const supabaseClient = serverSupabaseClient(event);
    const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN).readOnly;

    const { data: tweetData } = await twitterClient.v2.search(
      `${keyword ?? "supabase"} lang:en -is:retweet -is:reply -is:quote`,
      {
        expansions: "author_id",
        max_results: 100,
        "tweet.fields": "created_at",
      }
    );

    const tweets = tweetData.data?.map((i) => {
      let author = tweetData.includes.users.find((j) => j.id === i.author_id);
      let id = i.id;
      delete i.id;
      delete i.author_id;
      return {
        id,
        keyword,
        metadata: {
          ...i,
          author,
        },
      };
    }) ?? [];

    const { data, error } = await supabaseClient.from("tweets").upsert(tweets);

    return {
      data,
      error,
    };
  } catch (error) {
    return {
      ok: false,
      data: [],
      error: error.message,
    };
  }
});
