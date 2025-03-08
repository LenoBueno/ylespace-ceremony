
import { supabase } from "../../../integrations/supabase/client";
import { toast } from "../../../hooks/use-toast";
import { updateProfile, fetchUserProfile } from "../profileUtils";
import { User, UserRole } from "../types";

/**
 * Checks the current user session and sets up the user state
 */
export const useSessionCheck = async (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Erro ao buscar sessão:", error);
      setUser(null);
      setLoading(false);
      return;
    }
    
    if (data?.session?.user) {
      const { id, email } = data.session.user;
      
      // Fetch user profile
      const profileData = await fetchUserProfile(id);
        
      if (!profileData) {
        console.log("Perfil não encontrado, criando novo perfil");
        
        // Profile not found, create it
        const isAdmin = email === 'root@admin.com';
        const role: UserRole = isAdmin ? 'admin' : 'user';
        const success = await updateProfile(id, email || '', role);
        
        if (success) {
          setUser({
            id,
            email: email || '',
            role
          });
          setLoading(false);
          return;
        }
        
        toast({
          title: "Erro ao carregar perfil",
          description: "Não foi possível carregar suas informações de perfil.",
          variant: "destructive",
        });
        setUser(null);
        setLoading(false);
        return;
      }
      
      // Check if admin email and update role if needed
      if (email === 'root@admin.com' && profileData.role !== 'admin') {
        await updateProfile(id, email || '', 'admin');
        
        setUser({
          id,
          email: email || '',
          role: 'admin'
        });
      } else {
        setUser({
          id,
          email: email || '',
          role: profileData?.role || 'user'
        });
      }
      
      console.log("Usuário carregado:", { id, email, role: profileData?.role });
    } else {
      setUser(null);
    }
    setLoading(false);
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    setUser(null);
    setLoading(false);
  }
};
