
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  // Usuário padrão com acesso de administrador
  const [user] = useState<User>({
    id: '1',
    email: 'admin@exemplo.com',
    role: 'admin'
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    // Simula um processo de login
    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 500);
  };

  const logout = () => {
    console.log("Logging out..."); // Log para debug
    navigate("/login");
  };

  return {
    user,
    loading,
    login,
    logout,
    isAdmin: true, // Sempre retorna true para garantir acesso administrativo
  };
};
