import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import { AuthUser, ProfileType } from '@/backend/types/profiles';
import { supabase, isSupabaseConfigured } from '@/backend/database/supabase';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signOut as authSignOut, 
  getCurrentSession,
  getUserProfile,
  createUserProfile 
} from '@/backend/auth/authService';
import { simulateAuth, simulateGetProfile } from '@/backend/utils/developmentMode';

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
      const { data: { session } } = await getCurrentSession();
      
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
        
        // Simula um usuário autenticado usando o serviço de desenvolvimento
        const mockAuthResult = simulateAuth(email, profileType);
        
        if (!mockAuthResult) {
          toast({
            variant: "destructive",
            title: "Erro ao entrar",
            description: "Credenciais inválidas ou usuário não encontrado"
          });
          return { error: { message: "Credenciais inválidas" } };
        }
        
        setUser(mockAuthResult.user);
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
      
      // Login real com Supabase através do serviço de autenticação
      const { data, error } = await signInWithEmail(email, password);
      
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
      const { data, error } = await signUpWithEmail(email, password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar",
          description: error.message
        });
        return { error };
      }

      if (data.user) {
        // Cria registro na tabela users e nas tabelas de perfil
        await createUserProfile(data.user.id, profileType, {
          email: data.user.email,
          ...userData
        });

        toast({
          title: "Conta criada com sucesso",
          description: "Bem-vindo ao SimplyInvite!"
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
    
    // Logout real com o serviço de autenticação
    await authSignOut();
    navigate('/');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta"
    });
  };

  // Função para obter perfil do usuário
  const getProfile = async () => {
    if (!user) return null;
    
    // Em modo de desenvolvimento, retorna perfil simulado usando o serviço de desenvolvimento
    if (isDevMode) {
      return simulateGetProfile(user.id, profileType as ProfileType);
    }
    
    // Busca de perfil real usando o serviço de autenticação
    return getUserProfile(user.id, profileType as ProfileType);
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
