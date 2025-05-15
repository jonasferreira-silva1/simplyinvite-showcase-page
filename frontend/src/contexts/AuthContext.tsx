import React, { createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

// Removidos imports do backend
// import { AuthUser, ProfileType } from "@/backend/types/profiles";
// import { supabase, isSupabaseConfigured } from "@/backend/database/supabase";
// import { signInWithEmail, signUpWithEmail, signOut as authSignOut, getCurrentSession, getUserProfile, createUserProfile } from "@/backend/auth/authService";
// import { simulateAuth, simulateGetProfile } from "@/backend/utils/developmentMode";

// TODO: Definir tipos locais ou importar de um arquivo local
// interface AuthUser { ... }
// type ProfileType = 'talent' | 'hr' | 'manager';

interface AuthContextType {
  user: any; // Ajustar tipo
  session: Session | null;
  loading: boolean;
  profileType: any; // Ajustar tipo
  signIn: (
    email: string,
    password: string,
    expectedProfileType: any
  ) => Promise<{ error?: any }>;
  signUp: (
    email: string,
    password: string,
    profileType: any,
    userData: any
  ) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  getProfile: () => Promise<any>;
  isDevMode: boolean;
  setUser: (user: any) => void;
  setProfileType: (type: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [profileType, setProfileType] = useState<any>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isDevMode = import.meta.env.DEV;

  useEffect(() => {
    // TODO: Implementar inicialização da autenticação via API HTTP
    setLoading(false);
  }, []);

  // Função de login
  const signIn = async (
    email: string,
    password: string,
    expectedProfileType: any
  ): Promise<{ error?: any }> => {
    try {
      // TODO: Implementar login via API HTTP para o backend
      // Exemplo:
      // const response = await fetch('http://localhost:3001/api/login', { ... })
      // Tratar resposta e atualizar estado
      return {};
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: error.message || "Ocorreu um erro ao tentar fazer login",
      });
      return { error };
    }
  };

  // Função de cadastro
  const signUp = async (
    email: string,
    password: string,
    profileType: any,
    userData: any
  ) => {
    try {
      // TODO: Implementar cadastro via API HTTP para o backend
      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: error.message,
      });
      return { error };
    }
  };

  // Função de logout
  const signOut = async () => {
    // TODO: Implementar logout via API HTTP se necessário
    setUser(null);
    setProfileType(null);
    navigate("/");
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta",
    });
  };

  // Função para obter perfil do usuário
  const getProfile = async () => {
    if (!user) return null;
    // TODO: Implementar busca de perfil via API HTTP
    return null;
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
    isDevMode,
    setUser,
    setProfileType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
