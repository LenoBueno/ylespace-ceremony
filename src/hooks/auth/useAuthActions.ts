
import { useNavigate } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import { login as loginService, logout as logoutService, register as registerService } from "./authService";
import { User } from "./types";

/**
 * Hook for authentication actions (login, logout, register)
 */
export const useAuthActions = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const user = await loginService(email, password);
      
      if (user) {
        setUser(user);
        navigate("/home");
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      console.error("Erro de login no hook:", error);
      setLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const result = await registerService(email, password);
      
      setLoading(false);
      return result;
    } catch (error: any) {
      console.error("Erro de registro no hook:", error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      const success = await logoutService();
      
      if (success) {
        setUser(null);
        navigate("/login");
        return true;
      } else {
        setLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Erro ao fazer logout no hook:", error);
      setLoading(false);
      return false;
    }
  };

  return {
    login,
    logout,
    register
  };
};
