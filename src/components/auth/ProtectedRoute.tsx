import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileType } from "@/lib/supabase";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredProfileType: ProfileType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredProfileType,
}) => {
  const { user, profileType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-si-accent"></div>
      </div>
    );
  }

  if (!user) {
    // Redirecionar para a página de login correspondente
    switch (requiredProfileType) {
      case "talent":
        return <Navigate to="/jovem-auth" state={{ from: location }} replace />;
      case "hr":
        return <Navigate to="/rh-auth" state={{ from: location }} replace />;
      case "manager":
        return (
          <Navigate to="/gestor-auth" state={{ from: location }} replace />
        );
      default:
        return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  if (profileType !== requiredProfileType) {
    // Redirecionar para a página correta baseada no tipo de perfil
    switch (profileType) {
      case "talent":
        return <Navigate to="/jovem" replace />;
      case "hr":
        return <Navigate to="/rh" replace />;
      case "manager":
        return <Navigate to="/gestor" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
