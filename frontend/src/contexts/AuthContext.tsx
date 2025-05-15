import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
// @ts-ignore - Ignore module resolution issues
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
// @ts-ignore - Ignore module resolution issues
import { toast as sonnerToast } from "sonner";
import { authService } from "@/lib/api";

// Tipos
export type ProfileType = 'talent' | 'hr' | 'manager';

export interface AuthUser {
  id: string;
  email: string;
}

export interface UserProfile {
  id: string;
  email: string;
  profile_type: ProfileType;
  name?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  token: string | null;
  loading: boolean;
  profileType: ProfileType | null;
  signIn: (
    email: string,
    password: string,
    expectedProfileType: ProfileType
  ) => Promise<{ error?: any }>;
  signUp: (
    email: string,
    password: string,
    profileType: ProfileType,
    userData: any
  ) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<UserProfile | null>;
  isDevMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Salvar/recuperar estado de autenticação do localStorage
const TOKEN_KEY = 'simplyinvite_auth_token';
const USER_KEY = 'simplyinvite_user';
const PROFILE_KEY = 'simplyinvite_profile';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDevMode = import.meta.env.DEV;

  // Recuperar sessão do localStorage com useCallback para evitar recriação da função
  const loadStoredSession = useCallback(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      const storedProfile = localStorage.getItem(PROFILE_KEY);
      
      if (storedToken && storedUser && storedProfile) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setProfile(JSON.parse(storedProfile));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao recuperar sessão:', error);
      return false;
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  }, []);
  
  // Recuperar sessão do localStorage
  useEffect(() => {
    if (!initialLoadDone) {
      loadStoredSession();
    }
  }, [initialLoadDone, loadStoredSession]);

  // Função para salvar sessão no localStorage
  const saveSession = useCallback((userData: AuthUser, profileData: UserProfile, authToken: string) => {
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    
    setUser(userData);
    setProfile(profileData);
    setToken(authToken);
  }, []);

  // Função para limpar sessão do localStorage
  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROFILE_KEY);
    
    setUser(null);
    setProfile(null);
    setToken(null);
  }, []);

  // Função de login
  const signIn = useCallback(async (
    email: string,
    password: string,
    expectedProfileType: ProfileType
  ): Promise<{ error?: any }> => {
    try {
      setLoading(true);
      const response = await authService.login(email, password, expectedProfileType);
      
      if (response.error || !response.data) {
        throw new Error(response.error || 'Erro ao fazer login');
      }
      
      // Salvar dados da sessão
      const { user: userData, profile: profileData, token: authToken } = response.data;
      saveSession(userData, profileData, authToken);
      
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo, ${profileData.name || email}!`,
      });
      
      return { };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro ao tentar fazer login",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, [saveSession, toast]);

  // Função de cadastro
  const signUp = useCallback(async (
    email: string,
    password: string,
    profileType: ProfileType,
    userData: any,
    autoLogin: boolean = false
  ) => {
    try {
      setLoading(true);
      const response = await authService.register(email, password, profileType, userData);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: autoLogin 
          ? "Entrando automaticamente..." 
          : "Você já pode fazer login com suas credenciais",
      });
      
      // Se autoLogin estiver ativado, fazer login automaticamente
      if (autoLogin) {
        return await signIn(email, password, profileType);
      }
      
      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um erro ao tentar criar sua conta",
      });
      return { error };
    } finally {
      setLoading(false);
    }
  }, [signIn, toast]);

  // Função de logout
  const signOut = async () => {
    try {
      setLoading(true);
      
      if (token) {
        await authService.logout(token);
      }
      
      clearSession();
      navigate("/");
      
      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta",
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para obter perfil do usuário
  const getProfile = async () => {
    if (!token) return null;
    
    try {
      setLoading(true);
      const response = await authService.getProfile(token);
      
      if (response.error || !response.data) {
        throw new Error(response.error || 'Erro ao buscar perfil');
      }
      
      // Cast the response data to the correct type to avoid TS errors
      const typedResponse = response.data as unknown as { profile: UserProfile };
      
      setProfile(typedResponse.profile);
      return typedResponse.profile;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const profileType = profile?.profile_type || null;

  // Memoizando o valor do contexto
  const value = React.useMemo(() => ({
    user,
    profile,
    token,
    loading,
    profileType,
    signIn,
    signUp,
    signOut,
    getProfile,
    isDevMode
  }), [user, profile, token, loading, signIn, signOut, isDevMode, getProfile]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
