
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

  const updateProfile = async (userId: string, email: string, role: string = 'user') => {
    try {
      // Check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (checkError && !checkError.message.includes('No rows found')) {
        console.error("Erro ao verificar perfil:", checkError);
        return false;
      }

      // If profile exists, update it. Otherwise, create it.
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId, 
          email: email,
          role: role,
          updated_at: new Date().toISOString(),
          created_at: existingProfile ? existingProfile.created_at : new Date().toISOString()
        });

      if (upsertError) {
        console.error("Erro ao atualizar perfil:", upsertError);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return false;
    }
  };

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
            
            // Se o perfil não for encontrado, talvez o trigger não funcionou - tentar criar o perfil
            if (profileError.message.includes('No rows found')) {
              const role = email === 'root@admin.com' ? 'admin' : 'user';
              const success = await updateProfile(id, email || '', role);
              
              if (success) {
                setUser({
                  id,
                  email: email || '',
                  role: role
                });
                return;
              }
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
            await updateProfile(id, email, 'admin');
            
            setUser({
              id,
              email: email || '',
              role: 'admin'
            });
          } else {
            setUser({
              id,
              email: email || '',
              role: profileData?.role || 'user'
            });
          }
          
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
        
        // Verificar se é o email admin
        const isAdmin = email === 'root@admin.com';
        
        // Buscar ou criar perfil
        let userRole = 'user';
        
        // Buscar role do usuário
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', id)
          .single();
          
        if (profileError) {
          console.error("Erro ao buscar perfil após login:", profileError);
          
          // Se o perfil não for encontrado, tentar criar
          if (profileError.message.includes('No rows found')) {
            const role = isAdmin ? 'admin' : 'user';
            await updateProfile(id, email || '', role);
            userRole = role;
          }
        } else {
          userRole = profileData.role;
          
          // Se é o email admin mas a role não é admin, atualizar
          if (isAdmin && userRole !== 'admin') {
            await updateProfile(id, email || '', 'admin');
            userRole = 'admin';
          }
        }
        
        setUser({
          id,
          email: email || '',
          role: userRole
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
      
      // Caso especial para o administrador
      if (email === 'root@admin.com') {
        console.log("Tentando login de administrador");
        
        // Verificar se o usuário já existe
        const { data: existingUser, error: existingError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (existingError) {
          // Se o usuário não existe, criá-lo
          if (existingError.message.includes('Invalid login credentials')) {
            const { data: newUser, error: createError } = await supabase.auth.signUp({
              email,
              password
            });
            
            if (createError) {
              console.error("Erro ao criar usuário admin:", createError);
              toast({
                title: "Erro ao criar admin",
                description: createError.message || "Não foi possível criar o usuário administrador.",
                variant: "destructive",
              });
              return;
            }
            
            // Garantir que o perfil do admin seja criado/atualizado
            if (newUser?.user) {
              const success = await updateProfile(newUser.user.id, email, 'admin');
              
              if (!success) {
                toast({
                  title: "Erro ao configurar perfil admin",
                  description: "Conta criada, mas houve problema ao definir permissões de administrador.",
                  variant: "destructive",
                });
                return;
              }
              
              // Login automático
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
                  email: data.user.email || '',
                  role: 'admin'
                });
                
                navigate("/home");
                toast({
                  title: "Login de administrador realizado",
                  description: "Bem-vindo, Administrador!",
                });
              }
            }
          } else {
            toast({
              title: "Erro de login",
              description: existingError.message || "Ocorreu um erro durante o login.",
              variant: "destructive",
            });
          }
        } else if (existingUser?.user) {
          // Garantir que o admin tenha role de admin
          const success = await updateProfile(existingUser.user.id, email, 'admin');
          
          if (!success) {
            toast({
              title: "Erro ao confirmar permissões",
              description: "Login realizado, mas houve problema ao verificar permissões de administrador.",
              variant: "destructive",
            });
          }
          
          setUser({
            id: existingUser.user.id,
            email: existingUser.user.email || '',
            role: 'admin'
          });
          
          navigate("/home");
          toast({
            title: "Login de administrador realizado",
            description: "Bem-vindo de volta, Administrador!",
          });
        }
        
        return;
      }

      // Login normal para outros usuários
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
          
        let userRole = 'user';
        
        if (profileError) {
          console.error("Erro ao buscar perfil após login:", profileError);
          
          // Se o perfil não existir, criar
          if (profileError.message.includes('No rows found')) {
            await updateProfile(data.user.id, data.user.email || '');
          }
        } else {
          userRole = profileData.role;
        }
        
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          role: userRole
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
      
      // Verificar se é o email admin especial
      if (email === 'root@admin.com') {
        toast({
          title: "Email reservado",
          description: "Este email é reservado para o administrador do sistema.",
          variant: "destructive",
        });
        return null;
      }
      
      // Verificar se o email já existe
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
        
      if (existingUser) {
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
