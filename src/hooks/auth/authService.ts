import { supabase } from "../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import { updateProfile } from "./profileUtils";
import { User } from "./types";

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Erro ao fazer login:", error);
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
    console.error("Erro ao fazer login:", error.message);
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
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
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
    await updateProfile(data.user.id, data.user.email || '');

    toast({
      title: "Registro realizado com sucesso",
      description: "Verifique seu email para confirmar o registro.",
    });
    return true;
  } catch (error: any) {
    console.error("Erro ao registrar:", error.message);
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
