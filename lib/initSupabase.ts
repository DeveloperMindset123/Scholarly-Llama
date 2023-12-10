import { createClient } from '@supabase/supabase-js'

const supabasUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabasUrl) throw new Error('Supabase URL not found');  //for debugging pruposes
if (!supabaseAnonKey)  throw new Error('Supabase Anon key not found');  //for debugging purposes in case .env file doesn't recognize it

export const supabase = createClient(supabasUrl, supabaseAnonKey); //accepts two parameters, the supabaseUrl and supabaseAnonKey