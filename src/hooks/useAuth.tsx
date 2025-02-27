
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  role: string;
}

export const useAuth = () => {
  // Usuário padrão com acesso de administrador
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulação de carregamento de usuário
    setTimeout(() => {
      setUser({
        id: '1',
        email: 'admin@exemplo.com',
        role: 'admin'
      });
      setLoading(false);
      console.log("Usuário carregado!");
    }, 300);
  }, []);

  const login = async () => {
    setLoading(true);
    // Simula um processo de login
    setTimeout(() => {
      setUser({
        id: '1',
        email: 'admin@exemplo.com',
        role: 'admin'
      });
      setLoading(false);
      navigate("/home");
      console.log("Login realizado com sucesso!");
    }, 500);
  };

  const logout = () => {
    console.log("Logging out...");
    setUser(null);
    navigate("/login");
  };

  return {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
  };
};
