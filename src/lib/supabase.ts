import { createClient } from '@supabase/supabase-js';

// Ye variables humne Netlify mein pehle hi set kar diye hain
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase keys are missing. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
