
import { useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import { toast } from "../../hooks/use-toast";
import { updateProfile, fetchUserProfile } from "./profileUtils";
import { User, UserRole } from "./types";

/**
 * Hook for managing authentication session
 */
export const useAuthSession = (
  setUser: (user: User | null) => void,
  setLoading: (loading: boolean) => void
) => {
  useEffect(() => {
    // Check current user session
    const checkSession = async () => {
      try {
        setLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user) {
          const { id, email } = data.session.user;
          
          // Fetch user profile
          const profileData = await fetchUserProfile(id);
            
          if (!profileData) {
            console.error("Perfil não encontrado");
            
            // Profile not found, create it
            const isAdmin = email === 'root@admin.com';
            const role: UserRole = isAdmin ? 'admin' : 'user';
            const success = await updateProfile(id, email || '', role);
            
            if (success) {
              setUser({
                id,
                email: email || '',
                role: role
              });
              return;
            }
            
            toast({
              title: "Erro ao carregar perfil",
              description: "Não foi possível carregar suas informações de perfil.",
              variant: "destructive",
            });
            setUser(null);
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
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'SIGNED_IN' && session) {
        const { id, email } = session.user;
        
        // Check if admin email
        const isAdmin = email === 'root@admin.com';
        
        // Fetch or create profile
        let userRole: UserRole = 'user';
        
        // Fetch user role
        const profileData = await fetchUserProfile(id);
          
        if (!profileData) {
          console.error("Erro ao buscar perfil após login");
          
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
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        toast({
          title: "Logout realizado",
          description: "Sessão encerrada com sucesso.",
        });
      }
    });

    return () => {
      // Clean up listener
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading]);
};
