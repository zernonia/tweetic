import { createClient } from "@supabase/supabase-js"
const { SUPABASE_URL, SUPABASE_KEY } = useRuntimeConfig()
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
