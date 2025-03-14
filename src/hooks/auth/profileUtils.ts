
import { supabase } from "../../integrations/supabase/client";
import type { Database } from "../../integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

/**
 * Updates or creates a user profile in the database
 */
export const updateProfile = async (userId: string, email: string, role: UserRole = 'user') => {
  try {
    console.log("Atualizando perfil para usuário:", userId, "com email:", email, "e role:", role);
    
    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (checkError) {
      if (checkError.message.includes('No rows found')) {
        console.log("Perfil não encontrado, criando novo");
      } else {
        console.error("Erro ao verificar perfil:", checkError);
        console.error("Detalhes do erro:", checkError.details, "Código:", checkError.code);
        return false;
      }
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
      console.error("Detalhes do erro:", upsertError.details, "Código:", upsertError.code);
      
      if (upsertError.code === "42501") {
        console.error("Erro de permissão: verifique as políticas RLS da tabela 'profiles'");
      } else if (upsertError.code === "23505") {
        console.error("Erro de duplicidade: o perfil já existe com esse ID");
      }
      
      return false;
    }

    console.log("Perfil atualizado/criado com sucesso");
    return true;
  } catch (error: any) {
    console.error("Erro ao atualizar perfil:", error);
    console.error("Detalhes do erro:", error.message);
    return false;
  }
};

/**
 * Fetches a user profile from the database
 */
export const fetchUserProfile = async (userId: string) => {
  try {
    console.log("Buscando perfil para usuário:", userId);
    
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors if profile doesn't exist
      
    if (error) {
      console.error("Erro ao buscar perfil:", error);
      console.error("Detalhes do erro:", error.details, "Código:", error.code);
      
      if (error.code === "42501") {
        console.error("Erro de permissão: verifique as políticas RLS da tabela 'profiles'");
      }
      
      return null;
    }
    
    if (!data) {
      console.log("Nenhum perfil encontrado para o usuário:", userId);
      return null;
    }
    
    console.log("Perfil encontrado:", data);
    return data;
  } catch (error: any) {
    console.error("Erro ao buscar perfil:", error);
    console.error("Detalhes do erro:", error.message);
    return null;
  }
};
