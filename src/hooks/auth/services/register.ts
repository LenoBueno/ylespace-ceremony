
import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../../hooks/use-toast";
import { updateProfile } from "../profileUtils";
import { UserRole } from "../types";

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
