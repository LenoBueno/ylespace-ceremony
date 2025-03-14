
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
    detectSessionInUrl: true,
    storageKey: 'ylespace-auth-storage',
    debug: true // Enable debug mode for more detailed logs
  }
});

// Enhanced error logging for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth state changed:', event, session?.user?.id);
  
  // Log additional debugging info
  if (event === 'SIGNED_IN') {
    console.log('User signed in successfully:', session?.user?.email);
  } else if (event === 'SIGNED_OUT') {
    console.log('User signed out');
  } else if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed');
  } else if (event === 'USER_UPDATED') {
    console.log('User updated');
  } else if (event === 'USER_DELETED') {
    console.log('User deleted');
  } else if (event === 'PASSWORD_RECOVERY') {
    console.log('Password recovery initiated');
  }
});

// Add a debug function to test connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    // First test if we can connect to Supabase at all
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Supabase auth connection error:', authError);
      return false;
    }
    
    console.log('Auth connection successful, session:', authData.session ? 'Active' : 'None');
    
    // Then test if we can query a table
    const { data, error } = await supabase.from('profiles').select('count');
    
    if (error) {
      console.error('Supabase data connection error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      return false;
    }
    
    console.log('Database connection successful, received data:', data);
    return true;
  } catch (error) {
    console.error('Unexpected Supabase connection error:', error);
    return false;
  }
};

// Function to check if the current session is valid
export const checkSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Session check failed:', error);
      return null;
    }
    
    if (!data.session) {
      console.log('No active session found');
      return null;
    }
    
    console.log('Active session found for user:', data.session.user.id);
    return data.session;
  } catch (error) {
    console.error('Session check error:', error);
    return null;
  }
};

// Export a function to log all Supabase configuration
export const logSupabaseConfig = () => {
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase key length:', supabaseKey ? supabaseKey.length : 0);
  console.log('Supabase configuration:', {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'ylespace-auth-storage',
  });
};

// Initialize by testing connection
testSupabaseConnection().then(connected => {
  if (connected) {
    console.log('Supabase initialized successfully');
  } else {
    console.warn('Supabase initialization had errors - check console for details');
  }
});
