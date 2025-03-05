
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();

  console.log("AdminRoute - user:", user);
  console.log("AdminRoute - isAdmin:", isAdmin);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || !isAdmin) {
    console.log("Usuário não é admin, redirecionando para login");
    return <Navigate to="/login" replace />;
  }

  console.log("Usuário admin, renderizando conteúdo protegido");
  return <>{children}</>;
};
