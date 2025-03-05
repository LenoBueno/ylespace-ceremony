
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import ProfileCard from "@/components/ProfileCard";
import { useAuth } from "@/hooks/auth";

type Profile = {
  id: string;
  nome: string;
  orixa: string;
  nascimento: string;
  batizado: string;
};

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
      console.log(`Buscando perfil para o usuário com ID: ${user?.id}`);
      const response = await fetch(`http://localhost:3000/api/perfis?id=${user?.id}`);
      if (!response.ok) throw new Error('Erro ao buscar perfil');
      const data = await response.json();
      console.log('Perfil recuperado:', data);
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
