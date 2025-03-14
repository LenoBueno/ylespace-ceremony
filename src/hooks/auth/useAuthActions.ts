
import { useNavigate } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import { login as loginService, logout as logoutService, register as registerService } from "./services";
import { User } from "./types";
import { supabase } from "../../integrations/supabase/client";

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
      console.log("Iniciando processo de login...");
      
      // Test connection before attempting login
      const connectionOk = await supabase.from('profiles').select('count').maybeSingle();
      if (connectionOk.error) {
        console.error("Erro de conexão com o Supabase antes do login:", connectionOk.error);
        toast({
          title: "Erro de conexão",
          description: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet.",
          variant: "destructive",
        });
        setLoading(false);
        return false;
      }
      
      const user = await loginService(email, password);
      
      if (user) {
        console.log("Login bem-sucedido, usuário:", user.id);
        setUser(user);
        navigate("/home");
        return true;
      } else {
        console.log("Login falhou, nenhum usuário retornado");
        setLoading(false);
        return false;
      }
    } catch (error: any) {
      console.error("Erro de login no hook:", error);
      console.error("Detalhes do erro:", error.message);
      
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro durante o login. Tente novamente mais tarde.",
        variant: "destructive",
      });
      
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
      
      toast({
        title: "Erro ao registrar",
        description: error.message || "Ocorreu um erro durante o registro. Tente novamente mais tarde.",
        variant: "destructive",
      });
      
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
    } catch (error: any) {
      console.error("Erro ao fazer logout no hook:", error);
      
      toast({
        title: "Erro ao fazer logout",
        description: error.message || "Ocorreu um erro durante o logout. Tente novamente mais tarde.",
        variant: "destructive",
      });
      
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
