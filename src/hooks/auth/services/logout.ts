
import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../../hooks/use-toast";

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
