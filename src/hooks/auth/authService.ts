
import { supabase } from "../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import { updateProfile, fetchUserProfile } from "./profileUtils";
import { User, UserRole } from "./types";

/**
 * Handles user login with email and password
 */
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    console.log("Tentando login com:", email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro de autenticação:", error);
      
      // Handle specific error cases
      if (error.message.includes("Email not confirmed")) {
        await handleEmailConfirmationError(email);
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

    // Fetch user profile to get role
    const profileData = await fetchUserProfile(data.user.id);
    const userRole: UserRole = profileData?.role || 'user';

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: userRole,
    };
  } catch (error: any) {
    console.error("Erro de login:", error);
    toast({
      title: "Erro ao fazer login",
      description: error.message || "Ocorreu um erro durante o login",
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Handles email confirmation error by resending confirmation email
 */
const handleEmailConfirmationError = async (email: string): Promise<void> => {
  try {
    console.log("Reenviando email de confirmação para:", email);
    
    // Send a new confirmation email
    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    
    if (resendError) {
      console.error("Erro ao reenviar email de confirmação:", resendError);
      toast({
        title: "Erro ao reenviar email",
        description: resendError.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Email não confirmado",
      description: "Um novo email de confirmação foi enviado. Por favor, verifique sua caixa de entrada.",
      variant: "default", // Default variant
    });
  } catch (error: any) {
    console.error("Erro ao reenviar email:", error);
    toast({
      title: "Erro",
      description: error.message || "Erro ao processar solicitação",
      variant: "destructive",
    });
  }
};

/**
 * Registers a new user with email and password
 */
export const register = async (email: string, password: string): Promise<boolean> => {
  try {
    console.log("Registrando novo usuário:", email);
    
    // For admin account (root@admin.com), special handling
    const isAdmin = email === 'root@admin.com';
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/login',
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
    const role: UserRole = isAdmin ? 'admin' : 'user';
    await updateProfile(data.user.id, data.user.email || '', role);

    // Display success message
    const successMessage = isAdmin 
      ? "Conta de administrador criada com sucesso."
      : "Verifique seu email para confirmar o registro.";
    
    toast({
      title: "Registro realizado com sucesso",
      description: successMessage,
    });
    
    return true;
  } catch (error: any) {
    console.error("Erro ao registrar:", error);
    toast({
      title: "Erro ao registrar",
      description: error.message || "Ocorreu um erro durante o registro",
      variant: "destructive",
    });
    return false;
  }
};

/**
 * Logs out the current user
 */
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
      description: error.message || "Ocorreu um erro durante o logout",
      variant: "destructive",
    });
    return false;
  }
};
