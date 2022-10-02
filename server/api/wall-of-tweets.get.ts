import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  try {
    const { keyword } = useQuery(event);
    const supabaseClient = serverSupabaseClient(event);

    const { data, error } = await supabaseClient
      .from("wall_of_tweets")
      .select("url")
      .eq("keyword", keyword);

    if (error) throw new Error(error.message);

    return data?.map((i) => `https://twitter.com/${i.url}`) ?? [];
  } catch (error) {
    event.res.statusCode = 400;
    return { ok: false, message: error.message };
  }
});
