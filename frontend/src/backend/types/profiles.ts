
// Tipos para os diferentes perfis de usuário
export type ProfileType = 'talent' | 'hr' | 'manager';

// Interface para o usuário autenticado
export interface AuthUser {
  id: string;
  email: string;
  profile_type?: ProfileType;
}

// Interface para perfil de talentos
export interface TalentProfile {
  id: string;
  user_id: string;
  full_name: string;
  interest_area: string;
  portfolio_link?: string;
  avatar_url?: string;
  created_at: string;
}

// Interface para perfil de RH
export interface HRProfile {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  cnpj: string;
  avatar_url?: string;
  created_at: string;
}

// Interface para perfil de gestor
export interface ManagerProfile {
  id: string;
  user_id: string;
  full_name: string;
  company: string;
  position: string;
  talent_search_area: string;
  avatar_url?: string;
  created_at: string;
}
