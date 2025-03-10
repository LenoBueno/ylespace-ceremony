
import { useEffect } from "react";
import { useSessionCheck } from "./session/useSessionCheck";
import { useAuthStateListener } from "./session/useAuthStateListener";
import { User } from "./types";
import { supabase, testSupabaseConnection } from "../../integrations/supabase/client";

/**
 * Hook for managing authentication session
 */
export const useAuthSession = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  useEffect(() => {
    let mounted = true;

    // Check current user session
    const checkSession = async () => {
      try {
        // First test the connection
        const connectionOk = await testSupabaseConnection();
        if (!connectionOk && mounted) {
          console.warn('Supabase connection test failed - proceeding anyway');
        }
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          if (mounted) setUser(null);
          return;
        }

        if (session?.user) {
          console.log('Session found:', session.user.id);
          if (mounted) useSessionCheck(setUser, setLoading);
        } else {
          console.log('No session found');
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    // Initial session check
    checkSession();

    // Set up auth state change listener
    const { data: authListener } = useAuthStateListener(setUser, setLoading);

    // Clean up function
    return () => {
      mounted = false;
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [setUser, setLoading]);
};
