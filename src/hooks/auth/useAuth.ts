
import { useAuthState } from "./useAuthState";
import { useAuthSession } from "./useAuthSession";
import { useAuthActions } from "./useAuthActions";

/**
 * Main authentication hook that composes other auth hooks
 */
export const useAuth = () => {
  const { user, loading, isAdmin, setUser, setLoading } = useAuthState();
  
  // Initialize session management
  useAuthSession(setUser, setLoading);
  
  // Initialize authentication actions
  const { login, logout, register } = useAuthActions(setUser, setLoading);

  return {
    user,
    loading,
    isAdmin,
    login,
    logout,
    register,
  };
};

export default useAuth;
