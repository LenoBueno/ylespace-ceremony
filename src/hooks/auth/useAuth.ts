import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import { User, AuthState } from "./types";
import { login as loginService, logout as logoutService, register as registerService } from "./authService";
import { updateProfile, fetchUserProfile } from "./profileUtils";

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sessão atual do usuário
    const checkSession = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          const { id, email } = data.session.user;
          
          // Buscar informações do perfil do usuário
          const profileData = await fetchUserProfile(id);
            
          if (!profileData) {
            console.error("Perfil não encontrado");
            
            // Se o perfil não for encontrado, talvez o trigger não funcionou - tentar criar o perfil
            const isAdmin = email === 'root@admin.com';
            const role = isAdmin ? 'admin' : 'user';
            const success = await updateProfile(id, email || '', role);
            
            if (success) {
              setState({
                user: {
                  id,
                  email: email || '',
                  role: role
                },
                loading: false,
                isAdmin: role === 'admin'
              });
              return;
            }
            
            toast({
              title: "Erro ao carregar perfil",
              description: "Não foi possível carregar suas informações de perfil.",
              variant: "destructive",
            });
            return;
          }
          
          // Verifica se o email é do admin e atualiza a role se necessário
          if (email === 'root@admin.com' && profileData.role !== 'admin') {
            await updateProfile(id, email || '', 'admin');
            
            setState({
              user: {
                id,
                email: email || '',
                role: 'admin'
              },
              loading: false,
              isAdmin: true
            });
          } else {
            setState({
              user: {
                id,
                email: email || '',
                role: profileData?.role || 'user'
              },
              loading: false,
              isAdmin: profileData?.role === 'admin'
            });
          }
          
          console.log("Usuário carregado:", { id, email, role: profileData?.role });
        } else {
          setState({
            user: null,
            loading: false,
            isAdmin: false
          });
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setState({
          user: null,
          loading: false,
          isAdmin: false
        });
      }
    };

    checkSession();

    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        const { id, email } = session.user;
        
        // Verificar se é o email admin
        const isAdmin = email === 'root@admin.com';
        
        // Buscar ou criar perfil
        let userRole = 'user';
        
        // Buscar role do usuário
        const profileData = await fetchUserProfile(id);
          
        if (!profileData) {
          console.error("Erro ao buscar perfil após login");
          
          // Se o perfil não for encontrado, tentar criar
          const role = isAdmin ? 'admin' : 'user';
          await updateProfile(id, email || '', role);
          userRole = role;
        } else {
          userRole = profileData.role;
          
          // Se é o email admin mas a role não é admin, atualizar
          if (isAdmin && userRole !== 'admin') {
            await updateProfile(id, email || '', 'admin');
            userRole = 'admin';
          }
        }
        
        setState({
          user: {
            id,
            email: email || '',
            role: userRole
          },
          loading: false,
          isAdmin: userRole === 'admin'
        });
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo de volta!",
        });
      } else if (event === 'SIGNED_OUT') {
        setState({
          user: null,
          loading: false,
          isAdmin: false
        });
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
      setState(prev => ({ ...prev, loading: true }));
      
      const user = await loginService(email, password);
      
      if (user) {
        setState({
          user,
          loading: false,
          isAdmin: user.role === 'admin'
        });
        
        navigate("/home");
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    } catch (error: any) {
      console.error("Erro de login no hook:", error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const result = await registerService(email, password);
      
      setState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error: any) {
      console.error("Erro de registro no hook:", error);
      setState(prev => ({ ...prev, loading: false }));
      return null;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const success = await logoutService();
      
      if (success) {
        setState({
          user: null,
          loading: false,
          isAdmin: false
        });
        
        navigate("/login");
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.error("Erro ao fazer logout no hook:", error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    login,
    logout,
    register,
    isAdmin: state.isAdmin,
  };
};

export default useAuth;
