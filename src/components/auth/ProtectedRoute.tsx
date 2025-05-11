
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileType } from '@/backend/types/profiles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredProfileType: ProfileType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredProfileType 
}) => {
  const { user, loading, profileType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Usuário não está autenticado
        switch(requiredProfileType) {
          case 'talent':
            navigate('/jovem-auth');
            break;
          case 'hr':
            navigate('/rh-auth');
            break;
          case 'manager':
            navigate('/gestor-auth');
            break;
          default:
            navigate('/');
        }
      } else if (profileType !== requiredProfileType) {
        // Usuário está autenticado mas com o tipo de perfil errado
        navigate('/');
      }
    }
  }, [user, loading, navigate, profileType, requiredProfileType]);

  // Mostra nada enquanto verifica a autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-si-accent"></div>
      </div>
    );
  }

  // Se estiver autenticado e com o perfil correto, renderiza o conteúdo
  if (user && profileType === requiredProfileType) {
    return <>{children}</>;
  }

  // Não renderiza nada nos outros casos (redirecionamento já aconteceu)
  return null;
};

export default ProtectedRoute;
