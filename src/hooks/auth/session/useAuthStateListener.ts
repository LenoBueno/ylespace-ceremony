
import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../../hooks/use-toast";
import { fetchUserProfile, updateProfile } from "../profileUtils";
import { User, UserRole } from "../types";

/**
 * Sets up an auth state change listener
 */
export const useAuthStateListener = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    console.log("Auth state changed:", event, session?.user?.id);
    
    if (event === 'SIGNED_IN' && session) {
      setLoading(true);
      const { id, email } = session.user;
      
      // Check if admin email
      const isAdmin = email === 'root@admin.com';
      
      // Fetch or create profile
      let userRole: UserRole = 'user';
      
      // Fetch user role
      const profileData = await fetchUserProfile(id);
        
      if (!profileData) {
        console.log("Perfil não encontrado após login, criando novo perfil");
        
        // Create profile if not found
        const role: UserRole = isAdmin ? 'admin' : 'user';
        await updateProfile(id, email || '', role);
        userRole = role;
      } else {
        userRole = profileData.role;
        
        // Update to admin role if needed
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
      
      setLoading(false);
    } else if (event === 'SIGNED_OUT') {
      setUser(null);
      toast({
        title: "Logout realizado",
        description: "Sessão encerrada com sucesso.",
      });
    } else {
      // Garantir que setLoading(false) seja chamado para outros eventos
      setLoading(false);
    }
  });
};
