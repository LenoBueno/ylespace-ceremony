
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProfileCard from "@/components/ProfileCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const Home = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4">
          {profile ? (
            <div className="flex justify-center mt-16">
              <ProfileCard profile={profile} />
            </div>
          ) : (
            <p className="text-center text-black">Carregando informações do perfil...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
