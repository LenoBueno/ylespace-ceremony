
import { useState } from "react";
import { AuthState, User } from "./types";

/**
 * Hook for managing authentication state
 */
export const useAuthState = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false
  });

  const updateState = (newState: Partial<AuthState>) => {
    setState(prev => ({ ...prev, ...newState }));
  };

  const setUser = (user: User | null) => {
    setState({
      user,
      loading: false,
      isAdmin: user?.role === 'admin'
    });
  };

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  };

  return {
    ...state,
    updateState,
    setUser,
    setLoading
  };
};
