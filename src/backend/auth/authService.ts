
import { supabase } from '../database/supabase';
import { ProfileType } from '../types/profiles';

export const signInWithEmail = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const getCurrentSession = async () => {
  return supabase.auth.getSession();
};

export const createUserProfile = async (
  userId: string, 
  profileType: ProfileType, 
  profileData: any
) => {
  // Primeiro criamos o registro na tabela users
  await supabase.from('users').insert([
    { 
      id: userId, 
      email: profileData.email,
      profile_type: profileType 
    }
  ]);

  // Depois criamos o registro na tabela específica baseada no tipo de perfil
  switch(profileType) {
    case 'talent':
      return supabase.from('talent_profiles').insert([{
        user_id: userId,
        full_name: profileData.fullName,
        interest_area: profileData.interestArea,
        portfolio_link: profileData.portfolioLink
      }]);
    case 'hr':
      return supabase.from('hr_profiles').insert([{
        user_id: userId,
        full_name: profileData.fullName,
        company: profileData.company,
        cnpj: profileData.cnpj
      }]);
    case 'manager':
      return supabase.from('manager_profiles').insert([{
        user_id: userId,
        full_name: profileData.fullName,
        company: profileData.company,
        position: profileData.position,
        talent_search_area: profileData.talentSearchArea
      }]);
  }
};

export const getUserProfile = async (userId: string, profileType: ProfileType) => {
  switch(profileType) {
    case 'talent':
      return supabase
        .from('talent_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
    case 'hr':
      return supabase
        .from('hr_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
    case 'manager':
      return supabase
        .from('manager_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
    default:
      return { data: null, error: new Error('Tipo de perfil inválido') };
  }
};
