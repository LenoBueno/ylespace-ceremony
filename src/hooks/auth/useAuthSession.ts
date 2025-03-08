
import { useEffect } from "react";
import { useSessionCheck } from "./session/useSessionCheck";
import { useAuthStateListener } from "./session/useAuthStateListener";
import { User } from "./types";

/**
 * Hook for managing authentication session
 */
export const useAuthSession = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  useEffect(() => {
    // Check current user session
    useSessionCheck(setUser, setLoading);

    // Set up auth state change listener
    const { data: authListener } = useAuthStateListener(setUser, setLoading);

    return () => {
      // Clean up listener
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading]);
};
