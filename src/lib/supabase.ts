
import { createClient } from '@supabase/supabase-js';

// In development mode, we can use these default values or you can replace them with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-from-supabase';

// For production, we still want to enforce the environment variables
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Supabase URL and Anon Key must be defined in production environment');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
