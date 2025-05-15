import { createClient } from '@supabase/supabase-js'

// Supabase

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables')
}
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// API

export const APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID
if (!APPLICATION_ID) {
  throw new Error('Missing application ID environment variables')
}

export const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) {
  throw new Error('Missing API URL environment variables')
}
