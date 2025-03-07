
import { supabase } from "../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import { updateProfile } from "./profileUtils";
import { User } from "./types";

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    console.log("Tentando login com:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Erro de autenticação:", error);
      
      // Handle specific error cases
      if (error.message.includes("Email not confirmed")) {
        // Send a new confirmation email
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: email,
        });
        
        if (resendError) {
          console.error("Erro ao reenviar email de confirmação:", resendError);
        }
        
        toast({
          title: "Email não confirmado",
          description: "Um novo email de confirmação foi enviado. Por favor, verifique sua caixa de entrada.",
          variant: "destructive",
        });
        
        return null;
      }
      
      if (error.message.includes("Invalid login credentials")) {
        toast({
          title: "Credenciais inválidas",
          description: "Email ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
        return null;
      }
      
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    if (!data.user) {
      console.error("Usuário não encontrado.");
      toast({
        title: "Usuário não encontrado",
        description: "Credenciais inválidas.",
        variant: "destructive",
      });
      return null;
    }

    // Update user profile on login
    await updateProfile(data.user.id, data.user.email || '');

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: 'user', // Default role, will be updated by the auth listener
    };
  } catch (error: any) {
    console.error("Erro de login:", error);
    toast({
      title: "Erro ao fazer login",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

export const register = async (email: string, password: string): Promise<boolean> => {
  try {
    // For admin account (root@admin.com), set redirect to false to bypass email confirmation
    const isAdmin = email === 'root@admin.com';
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: window.location.origin + '/login',
        // If admin account, we'll handle it differently
        data: {
          is_admin: isAdmin
        }
      }
    });

    if (error) {
      console.error("Erro ao registrar:", error);
      toast({
        title: "Erro ao registrar",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    if (!data.user) {
      console.error("Falha ao criar usuário.");
      toast({
        title: "Falha ao criar usuário",
        description: "Tente novamente.",
        variant: "destructive",
      });
      return false;
    }

    // Update user profile on registration
    const role = isAdmin ? 'admin' : 'user';
    await updateProfile(data.user.id, data.user.email || '', role);

    if (isAdmin) {
      // For admin users, show special message
      toast({
        title: "Administrador registrado",
        description: "Conta de administrador criada com sucesso.",
      });
    } else {
      toast({
        title: "Registro realizado com sucesso",
        description: "Verifique seu email para confirmar o registro.",
      });
    }
    
    return true;
  } catch (error: any) {
    console.error("Erro ao registrar:", error);
    toast({
      title: "Erro ao registrar",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao fazer logout:", error);
      toast({
        title: "Erro ao fazer logout",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    return true;
  } catch (error: any) {
    console.error("Erro ao fazer logout:", error.message);
    toast({
      title: "Erro ao fazer logout",
      description: error.message,
      variant: "destructive",
    });
    return false;
  }
};
