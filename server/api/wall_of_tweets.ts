import { supabase } from "../_lib/supabase"

export default defineEventHandler(async (event) => {
  const { keyword } = useQuery(event)
  const { data } = await supabase.from("wall_of_tweets").select("id, url").eq("keyword", keyword)
  return data
})
