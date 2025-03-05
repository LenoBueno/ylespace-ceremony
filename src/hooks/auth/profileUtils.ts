
import { supabase } from "@/integrations/supabase/client";

/**
 * Updates or creates a user profile in the database
 */
export const updateProfile = async (userId: string, email: string, role: string = 'user') => {
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

/**
 * Fetches a user profile from the database
 */
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
      
    if (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return null;
  }
};
