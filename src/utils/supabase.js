import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Faltan configurar las variables de entorno de Supabase: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env. ' +
    'El cliente de Supabase no funcionará correctamente hasta que se configuren.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
