import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, ProfileType, AuthUser, isSupabaseConfigured } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  profileType: ProfileType | null;
  signIn: (email: string, password: string, profileType: ProfileType) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, profileType: ProfileType, userData: any) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<any>;
  isDevMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileType, setProfileType] = useState<ProfileType | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDevMode = import.meta.env.DEV && !isSupabaseConfigured();

  useEffect(() => {
    // Inicializa o estado da autenticação
    const initAuth = async () => {
      setLoading(true);
      
      // Verifica se há uma sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      
      setSession(session);
      
      if (session?.user) {
        // Busca informações adicionais do usuário
        const { data: userData, error } = await supabase
          .from('users')
          .select('profile_type')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            profile_type: userData.profile_type,
          });
          setProfileType(userData.profile_type);
        } else {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });
        }
      }
      
      setLoading(false);
    };

    initAuth();

    // Configura listener para mudanças na autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (event === 'SIGNED_IN' && session) {
        // Busca informações adicionais do usuário
        const { data: userData } = await supabase
          .from('users')
          .select('profile_type')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            profile_type: userData.profile_type,
          });
          setProfileType(userData.profile_type);
        } else {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfileType(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função de login
  const signIn = async (email: string, password: string, profileType: ProfileType) => {
    try {
      // Modo de desenvolvimento (simulação de autenticação)
      if (isDevMode) {
        console.log("🔧 Usando modo de desenvolvimento para autenticação");
        
        // Simula um usuário autenticado
        const mockUserId = `dev-${profileType}-${Date.now()}`;
        const mockUser = {
          id: mockUserId,
          email: email,
          profile_type: profileType
        };
        
        setUser(mockUser);
        setProfileType(profileType);
        
        // Redireciona para a página apropriada
        switch(profileType) {
          case 'talent':
            navigate('/jovem');
            break;
          case 'hr':
            navigate('/rh');
            break;
          case 'manager':
            navigate('/gestor');
            break;
        }
        
        return { error: null };
      }
      
      // Login real com Supabase
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao entrar",
          description: error.message
        });
        return { error };
      }

      // Verifica se o tipo de perfil corresponde
      if (data.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('profile_type')
          .eq('id', data.user.id)
          .single();
        
        if (userData && userData.profile_type !== profileType) {
          // Tipo de perfil não corresponde
          await supabase.auth.signOut();
          toast({
            variant: "destructive",
            title: "Tipo de perfil incorreto",
            description: "O email fornecido está associado a um tipo de perfil diferente."
          });
          return { error: { message: "Tipo de perfil incorreto" } };
        }

        // Redireciona para a página apropriada
        switch(profileType) {
          case 'talent':
            navigate('/jovem');
            break;
          case 'hr':
            navigate('/rh');
            break;
          case 'manager':
            navigate('/gestor');
            break;
        }
      }

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: error.message
      });
      return { error };
    }
  };

  // Função de cadastro
  const signUp = async (email: string, password: string, profileType: ProfileType, userData: any) => {
    try {
      // Modo de desenvolvimento (simulação de cadastro)
      if (isDevMode) {
        console.log("🔧 Usando modo de desenvolvimento para cadastro");
        
        // Simula um usuário cadastrado
        const mockUserId = `dev-${profileType}-${Date.now()}`;
        const mockUser = {
          id: mockUserId,
          email: email,
          profile_type: profileType
        };
        
        setUser(mockUser);
        setProfileType(profileType);
        
        toast({
          title: "Conta simulada criada com sucesso",
          description: "Você está usando o modo de desenvolvimento."
        });
        
        // Redireciona para a página apropriada
        switch(profileType) {
          case 'talent':
            navigate('/jovem');
            break;
          case 'hr':
            navigate('/rh');
            break;
          case 'manager':
            navigate('/gestor');
            break;
        }
        
        return { error: null };
      }
      
      // Cadastro real com Supabase
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar",
          description: error.message
        });
        return { error };
      }

      if (data.user) {
        // Cria registro na tabela users
        await supabase.from('users').insert([
          { 
            id: data.user.id, 
            email: data.user.email,
            profile_type: profileType 
          }
        ]);

        // Cria registro na tabela específica baseada no tipo de perfil
        switch(profileType) {
          case 'talent':
            await supabase.from('talent_profiles').insert([{
              user_id: data.user.id,
              full_name: userData.fullName,
              interest_area: userData.interestArea,
              portfolio_link: userData.portfolioLink
            }]);
            navigate('/jovem');
            break;
          case 'hr':
            await supabase.from('hr_profiles').insert([{
              user_id: data.user.id,
              full_name: userData.fullName,
              company: userData.company,
              cnpj: userData.cnpj
            }]);
            navigate('/rh');
            break;
          case 'manager':
            await supabase.from('manager_profiles').insert([{
              user_id: data.user.id,
              full_name: userData.fullName,
              company: userData.company,
              position: userData.position,
              talent_search_area: userData.talentSearchArea
            }]);
            navigate('/gestor');
            break;
        }

        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao SimplyInvite!"
        });
      }

      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: error.message
      });
      return { error };
    }
  };

  // Função de logout
  const signOut = async () => {
    // Em modo de desenvolvimento, apenas limpa o estado local
    if (isDevMode) {
      setUser(null);
      setProfileType(null);
      navigate('/');
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta simulada"
      });
      return;
    }
    
    // Logout real com Supabase
    await supabase.auth.signOut();
    navigate('/');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta"
    });
  };

  // Função para obter perfil do usuário
  const getProfile = async () => {
    if (!user) return null;
    
    // Em modo de desenvolvimento, retorna perfil simulado
    if (isDevMode) {
      switch(profileType) {
        case 'talent': {
          return { 
            data: { 
              id: `dev-talent-${Date.now()}`,
              user_id: user.id,
              full_name: "Jovem de Teste",
              interest_area: "Desenvolvimento Web",
              portfolio_link: "https://example.com/portfolio",
              avatar_url: null,
              created_at: new Date().toISOString()
            }, 
            error: null 
          };
        }
        case 'hr': {
          return { 
            data: { 
              id: `dev-hr-${Date.now()}`,
              user_id: user.id,
              full_name: "RH de Teste",
              company: "Empresa Teste",
              cnpj: "12.345.678/0001-90",
              avatar_url: null,
              created_at: new Date().toISOString()
            }, 
            error: null 
          };
        }
        case 'manager': {
          return { 
            data: { 
              id: `dev-manager-${Date.now()}`,
              user_id: user.id,
              full_name: "Gestor de Teste",
              company: "Empresa Teste",
              position: "Diretor de Inovação",
              talent_search_area: "Tecnologia",
              avatar_url: null,
              created_at: new Date().toISOString()
            }, 
            error: null 
          };
        }
        default:
          return { data: null, error: null };
      }
    }
    
    // Busca de perfil real com Supabase
    try {
      switch(profileType) {
        case 'talent': {
          const { data, error } = await supabase
            .from('talent_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          return { data, error };
        }
        case 'hr': {
          const { data, error } = await supabase
            .from('hr_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          return { data, error };
        }
        case 'manager': {
          const { data, error } = await supabase
            .from('manager_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
          return { data, error };
        }
        default:
          return { data: null, error: null };
      }
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    session,
    loading,
    profileType,
    signIn,
    signUp,
    signOut,
    getProfile,
    isDevMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
