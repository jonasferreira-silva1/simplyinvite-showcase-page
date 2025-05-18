import React, { createContext, useState, useEffect, useContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";
import { login, registrar } from "@/servicos/usuario";

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
    const initializeAuth = async () => {
      try {
        // Verifica se há um usuário salvo no localStorage em modo de desenvolvimento
        if (isDevMode) {
          const savedUser = localStorage.getItem("dev_user");
          const savedProfileType = localStorage.getItem("dev_profile_type");

          if (savedUser && savedProfileType) {
            setUser(JSON.parse(savedUser));
            setProfileType(savedProfileType);
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [isDevMode]);

  // Função de login
  const signIn = async (
    email: string,
    password: string,
    expectedProfileType: any
  ): Promise<{ error?: any }> => {
    try {
      setLoading(true);

      // --- INÍCIO: Lógica de login simulado para desconectar do backend ---
      // Comentei a chamada original ao backend para simular o sucesso
      // const data = await login(email, password);

      // Simula um objeto de usuário simples com base no tipo de perfil esperado
      const mockUser = {
        id: "mock-user-user", // ID simulado
        email: email, // Usa o email fornecido
        profileType: expectedProfileType,
        // Adicione outras propriedades de usuário mock conforme necessário
      };

      // Simula o armazenamento no localStorage em modo de desenvolvimento (opcional, mas útil)
      if (isDevMode) {
        localStorage.setItem("dev_user", JSON.stringify(mockUser));
        localStorage.setItem("dev_profile_type", expectedProfileType);
      }

      // Atualiza o estado do usuário e tipo de perfil
      setUser(mockUser);
      setProfileType(expectedProfileType);

      // Navega para a rota correta baseada no tipo de perfil simulado
      switch (expectedProfileType) {
        case "talent":
          navigate("/jovem");
          break;
        case "hr":
          navigate("/rh");
          break;
        case "manager":
          navigate("/gestor");
          break;
        default:
          navigate("/");
      }

      // Exibe uma mensagem de sucesso simulada
      toast({
        title: "Login simulado realizado",
        description: "Navegando para o painel.",
      });

      // Simula sucesso sem erro
      return {};
      // --- FIM: Lógica de login simulado ---

      // --- Lógica original (descomente para reconectar ao backend) ---
      // if (data && data.token) {
      //   localStorage.setItem("token", data.token);
      //   setUser(data.usuario);
      //   setProfileType(data.tipoPerfil);
      //   switch (data.tipoPerfil) {
      //     case "talent":
      //       navigate("/jovem");
      //       break;
      //     case "hr":
      //       navigate("/rh");
      //       break;
      //     case "manager":
      //       navigate("/gestor");
      //       break;
      //     default:
      //       navigate("/");
      //   }
      //   toast({
      //     title: "Login realizado com sucesso",
      //     description: "Bem-vindo de volta!",
      //   });
      //   return {};
      // } else {
      //   throw new Error("Credenciais inválidas");
      // }
      // --- FIM: Lógica original ---
    } catch (error: any) {
      // Mantenha o tratamento de erro para o caso de algo dar errado na simulação ou se descomentar a lógica original
      toast({
        variant: "destructive",
        title: "Erro na simulação de login",
        description: error.message || "Ocorreu um erro ao simular login",
      });
      return { error };
    } finally {
      setLoading(false);
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
      setLoading(true);
      await registrar({
        email,
        senha: password,
        tipoPerfil: profileType,
        nomeCompleto: userData.fullName,
      });
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login!",
      });
      return { error: null };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: error.message,
      });
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const signOut = async () => {
    try {
      setLoading(true);

      // Limpa o localStorage em modo de desenvolvimento
      if (isDevMode) {
        localStorage.removeItem("dev_user");
        localStorage.removeItem("dev_profile_type");
      }

      setUser(null);
      setProfileType(null);
      navigate("/");

      toast({
        title: "Logout realizado",
        description: "Você saiu da sua conta",
      });
    } finally {
      setLoading(false);
    }
  };

  // Função para obter perfil do usuário
  const getProfile = async () => {
    if (!user) return { data: null };
    // MOCK: Retorna um perfil simulado para liberar o painel
    return {
      data: {
        full_name: user.email?.split("@")[0] || "Usuário Teste",
      },
    };
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
