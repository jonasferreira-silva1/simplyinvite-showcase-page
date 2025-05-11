
import { supabase } from '../database/supabase';

export const getTalentsInArea = async (area: string) => {
  return supabase
    .from('talent_profiles')
    .select('*')
    .eq('interest_area', area);
};

export const getFavoriteTalents = async (managerId: string) => {
  return supabase
    .from('favorite_talents')
    .select('*, talent_profiles(*)')
    .eq('manager_id', managerId);
};

export const addTalentToFavorites = async (managerId: string, talentId: string) => {
  return supabase
    .from('favorite_talents')
    .insert([{ manager_id: managerId, talent_id: talentId }]);
};

export const scheduleInterview = async (interviewData: any) => {
  return supabase
    .from('interviews')
    .insert([interviewData]);
};
