
import { supabase } from '../database/supabase';

export const getPendingProjects = async () => {
  return supabase
    .from('projects')
    .select('*, talent_profiles(*)')
    .eq('status', 'pending');
};

export const evaluateProject = async (evaluationData: any) => {
  return supabase
    .from('evaluations')
    .insert([evaluationData]);
};

export const getEvaluationHistory = async (hrId: string) => {
  return supabase
    .from('evaluations')
    .select('*, projects(*), talent_profiles(*)')
    .eq('hr_id', hrId);
};
