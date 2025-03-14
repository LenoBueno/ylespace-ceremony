
import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../../hooks/use-toast";
import { fetchUserProfile } from "../profileUtils";
import { User, UserRole } from "../types";

/**
 * Handles email confirmation error by resending confirmation email
 */
export const handleEmailConfirmationError = async (email: string): Promise<void> => {
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
 * Handles user login with email and password
 */
export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    console.log("Tentando login com:", email);
    
    // Log configuration before attempting login
    console.log("Configuração do Supabase antes do login:", {
      url: supabase.supabaseUrl,
      hasKey: !!supabase.supabaseKey,
      keyLength: supabase.supabaseKey?.length || 0,
      authConfig: supabase.auth.autoRefreshToken,
      storageKey: supabase.auth._persistSession ? "Config ativada" : "Config desativada"
    });
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro de autenticação:", error);
      console.error("Código do erro:", error.status || "N/A");
      console.error("Mensagem completa:", error.message);
      
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

    console.log("Usuário autenticado:", data.user.id);
    console.log("Sessão criada:", !!data.session);

    // Fetch user profile to get role
    const profileData = await fetchUserProfile(data.user.id);
    
    if (!profileData) {
      console.log("Perfil não encontrado, tentando criar um novo");
    } else {
      console.log("Perfil encontrado com role:", profileData.role);
    }
    
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
