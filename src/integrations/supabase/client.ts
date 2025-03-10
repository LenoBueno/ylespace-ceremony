
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://dktbakvydlbtpwwjeyrd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrdGJha3Z5ZGxidHB3d2pleXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExMTg0OTcsImV4cCI6MjA1NjY5NDQ5N30.TRrv7DrKX1n83p_ZUNkHxjD8gUAArblfVPWW6IBfbSI';

if (!supabaseUrl) throw new Error('Missing SUPABASE_URL');
if (!supabaseKey) throw new Error('Missing SUPABASE_ANON_KEY');

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Add error logging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth state changed:', event, session?.user?.id);
});
