
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  console.log("PrivateRoute - user:", user);
  console.log("PrivateRoute - loading:", loading);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    console.log("Usuário não autenticado, redirecionando para login");
    return <Navigate to="/login" replace />;
  }

  console.log("Usuário autenticado, renderizando conteúdo protegido");
  return <>{children}</>;
};
