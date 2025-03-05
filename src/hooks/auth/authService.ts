
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { updateProfile, fetchUserProfile } from "./profileUtils";
import { User } from "./types";

/**
 * Handles user login with email and password
 */
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
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
            return null;
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
              return null;
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
              toast({
                title: "Login de administrador realizado",
                description: "Bem-vindo, Administrador!",
              });
              
              return {
                id: data.user.id,
                email: data.user.email || '',
                role: 'admin'
              };
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
        
        toast({
          title: "Login de administrador realizado",
          description: "Bem-vindo de volta, Administrador!",
        });
        
        return {
          id: existingUser.user.id,
          email: existingUser.user.email || '',
          role: 'admin'
        };
      }
      
      return null;
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
      const profileData = await fetchUserProfile(data.user.id);
          
      let userRole = 'user';
      
      if (!profileData) {
        // Se o perfil não existir, criar
        await updateProfile(data.user.id, data.user.email || '');
      } else {
        userRole = profileData.role;
      }
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      console.log("Login bem-sucedido:", data.user);
      
      return {
        id: data.user.id,
        email: data.user.email || '',
        role: userRole
      };
    }
    
    return null;
  } catch (error: any) {
    console.error("Erro de login:", error);
    // Toast já exibido nos blocos específicos de erro
    return null;
  }
};

/**
 * Handles user registration with email and password
 */
export const register = async (email: string, password: string) => {
  try {
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
  }
};

/**
 * Handles user logout
 */
export const logout = async () => {
  try {
    console.log("Fazendo logout...");
    
    await supabase.auth.signOut();
    
    toast({
      title: "Logout realizado com sucesso",
    });
    
    return true;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    toast({
      title: "Erro ao fazer logout",
      description: "Ocorreu um erro ao tentar sair.",
      variant: "destructive",
    });
    return false;
  }
};
