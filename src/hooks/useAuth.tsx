
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
          
          // Buscar informações do perfil do usuário
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', id)
            .single();
            
          if (profileError) {
            console.error("Erro ao buscar perfil:", profileError);
            toast({
              title: "Erro ao carregar perfil",
              description: "Não foi possível carregar suas informações de perfil.",
              variant: "destructive",
            });
            return;
          }
          
          setUser({
            id,
            email: email || '',
            role: profileData?.role || 'user'
          });
          
          console.log("Usuário carregado:", { id, email, role: profileData?.role });
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
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        const { id, email } = session.user;
        
        // Buscar role do usuário
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', id)
          .single();
          
        if (profileError) {
          console.error("Erro ao buscar perfil após login:", profileError);
        }
        
        setUser({
          id,
          email: email || '',
          role: profileData?.role || 'user'
        });
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        toast({
          title: "Logout realizado",
          description: "Sessão encerrada com sucesso.",
        });
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
      
      // Validações básicas
      if (!email || !email.includes('@')) {
        toast({
          title: "Email inválido",
          description: "Por favor, forneça um email válido.",
          variant: "destructive",
        });
        return;
      }
      
      if (!password || password.length < 6) {
        toast({
          title: "Senha inválida",
          description: "A senha deve ter pelo menos 6 caracteres.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("Tentando login com:", email);
      
      // Versão para desenvolvimento: simula login bem-sucedido
      if (process.env.NODE_ENV === 'development' && email === 'dev@test.com' && password === 'devtest') {
        setTimeout(() => {
          setUser({
            id: '1',
            email: 'dev@test.com',
            role: 'admin'
          });
          setLoading(false);
          navigate("/home");
          console.log("Login simulado realizado com sucesso!");
          toast({
            title: "Login de desenvolvimento",
            description: "Login simulado realizado com sucesso!",
          });
        }, 500);
        return;
      }

      // Versão real usando Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Erro de autenticação:", error);
        
        // Mensagens de erro mais específicas
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Credenciais inválidas",
            description: "Email ou senha incorretos. Por favor, tente novamente.",
            variant: "destructive",
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email não confirmado",
            description: "Por favor, verifique seu email e confirme sua conta.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao fazer login",
            description: error.message || "Ocorreu um erro durante o login.",
            variant: "destructive",
          });
        }
        
        throw error;
      }

      if (data?.user) {
        // Buscar informações do perfil
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error("Erro ao buscar perfil após login:", profileError);
        }
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: profileData?.role || 'user'
        });
        
        navigate("/home");
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
        
        console.log("Login bem-sucedido:", data.user);
      }
    } catch (error: any) {
      console.error("Erro de login:", error);
      // Toast já exibido nos blocos específicos de erro
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Validações básicas
      if (!email || !email.includes('@')) {
        toast({
          title: "Email inválido",
          description: "Por favor, forneça um email válido.",
          variant: "destructive",
        });
        return null;
      }
      
      if (!password || password.length < 6) {
        toast({
          title: "Senha inválida",
          description: "A senha deve ter pelo menos 6 caracteres.",
          variant: "destructive",
        });
        return null;
      }
      
      // Verificar se o email já existe
      const { data: existingUser, error: checkError } = await supabase.auth.signInWithPassword({
        email,
        password: 'temporary_check_password'
      });
      
      if (existingUser?.user) {
        toast({
          title: "Email já registrado",
          description: "Este email já está associado a uma conta. Tente fazer login.",
          variant: "destructive",
        });
        return null;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error("Erro no registro:", error);
        
        // Mensagens de erro mais específicas
        if (error.message.includes('already registered')) {
          toast({
            title: "Email já registrado",
            description: "Este email já está associado a uma conta. Tente fazer login.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao registrar",
            description: error.message || "Ocorreu um erro durante o registro.",
            variant: "destructive",
          });
        }
        
        throw error;
      }

      toast({
        title: "Registro realizado com sucesso",
        description: data.user?.identities?.length === 0 
          ? "Este email já estava registrado. Tente fazer login." 
          : "Verifique seu email para confirmar o cadastro.",
      });
      
      console.log("Registro bem-sucedido:", data);
      return data;
    } catch (error: any) {
      console.error("Erro de registro:", error);
      // Toast já exibido nos blocos específicos de erro
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      console.log("Fazendo logout...");
      
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
