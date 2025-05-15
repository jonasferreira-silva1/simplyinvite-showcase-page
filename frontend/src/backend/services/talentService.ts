
import { supabase } from '../database/supabase';

export const getTalentProjects = async (talentId: string) => {
  return supabase
    .from('projects')
    .select('*')
    .eq('talent_id', talentId);
};

export const submitProject = async (projectData: any) => {
  return supabase
    .from('projects')
    .insert([projectData]);
};

export const getTalentFeedbacks = async (talentId: string) => {
  return supabase
    .from('feedbacks')
    .select('*, evaluations(*)')
    .eq('talent_id', talentId);
};
