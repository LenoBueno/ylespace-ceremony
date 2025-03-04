
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sessão atual do usuário
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          const { id, email } = data.session.user;
          // No sistema real, buscaríamos o papel do usuário do banco de dados
          // Por enquanto, definimos como 'admin' para manter a funcionalidade
          setUser({
            id,
            email: email || 'admin@exemplo.com',
            role: 'admin'
          });
          console.log("Usuário carregado!");
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { id, email } = session.user;
        setUser({
          id,
          email: email || 'admin@exemplo.com',
          role: 'admin'
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      // Limpar listener
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Tentando login com:", email);
      
      // Versão para desenvolvimento: simula login bem-sucedido
      if (process.env.NODE_ENV === 'development' && (!email || !password)) {
        setTimeout(() => {
          setUser({
            id: '1',
            email: 'admin@exemplo.com',
            role: 'admin'
          });
          setLoading(false);
          navigate("/home");
          console.log("Login simulado realizado com sucesso!");
        }, 500);
        return;
      }

      // Versão real usando Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || 'admin@exemplo.com',
          role: 'admin'
        });
        navigate("/home");
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
      }
    } catch (error: any) {
      console.error("Erro de login:", error);
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Registro realizado com sucesso",
        description: "Verifique seu email para confirmar o cadastro.",
      });
      
      return data;
    } catch (error: any) {
      console.error("Erro de registro:", error);
      toast({
        title: "Erro ao registrar",
        description: error.message || "Tente novamente com outro email.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log("Logging out...");
      
      await supabase.auth.signOut();
      setUser(null);
      navigate("/login");
      
      toast({
        title: "Logout realizado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao fazer logout",
        description: "Ocorreu um erro ao tentar sair.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAdmin: user?.role === 'admin',
  };
};
