
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>({ id: '1' } as User);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>("root@admin.com");
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    // Login automático como admin
    navigate("/home");
  };

  const logout = async () => {
    navigate("/login");
  };

  return {
    user,
    profile,
    loading,
    login,
    logout,
    isAdmin: true, // Sempre retorna true para ter acesso a todas as funcionalidades
  };
};
