import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const { keyword } = getQuery(event);
    const client = serverSupabaseClient(event);

    const { data } = await client.from("wall_of_tweets").select("url").eq("keyword", keyword);
    return data?.map((i) => `https://twitter.com/${i.url}`);
  } catch (err) {
    return sendError(event, Error(`${err}`), process.env.NODE_ENV === "development");
  }
});
