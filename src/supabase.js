import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://your-project.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key'

const isValid = (url) => {
  try { return url && url.startsWith('http') && new URL(url) } catch { return false }
}

let supabase = null
if (isValid(SUPABASE_URL) && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.length > 20) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
} else {
  console.warn('[Табачок-Оптовичок] Supabase не подключен. Демо-режим.')
}

export { supabase }
