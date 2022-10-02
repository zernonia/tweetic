import { serverSupabaseClient } from "#supabase/server";
import { TwitterApi } from "twitter-api-v2";
import { verify } from "../_lib/verify";

export default defineEventHandler(async (event) => {
  try {
    verify(event);

    const { TWITTER_BEARER_TOKEN } = useRuntimeConfig();

    if (!TWITTER_BEARER_TOKEN) throw new Error("Missing Twitter Bearer Token");

    const { keyword } = useQuery(event);
    const supabaseClient = serverSupabaseClient(event);
    const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN).readOnly;

    const { data: tweetData } = await twitterClient.v2.search(
      `${
        keyword ?? "supabase"
      } -is:reply (happy OR exciting OR wonderful OR excited OR favorite OR fav OR amazing OR incredible OR best OR good OR love) -paid -course -hour -join`,
      {
        expansions: "author_id",
        max_results: 100,
      }
    );

    const tweets = tweetData.data.map((i) => {
      let author_name = tweetData.includes.users.find(
        (j) => j.id === i.author_id
      )?.username;

      return {
        id: i.id,
        url: `${author_name}/status/${i.id}`,
        keyword,
        raw: i,
      };
    });

    const { data, error } = await supabaseClient
      .from("wall_of_tweets")
      .upsert(tweets);

    return {
      data,
      error,
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
    };
  }
});
