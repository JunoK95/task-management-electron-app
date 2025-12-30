import { supabase } from '@/services/supabase/client';
import { Project } from '@/types';

export type ProjectFormValues = {
  name: string;
  created_by: string;
  workspace_id: string;
  description?: string;
};

export async function getProjectById(id: string): Promise<Project> {
  const { data, error } = await supabase.from('projects').select().eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function getProjectsByWorkspaceId(workspace_id: string): Promise<Project[]> {
  const { data, error } = await supabase.from('projects').select().eq('workspace_id', workspace_id);

  if (error) throw error;
  return data;
}

export async function createProject(payload: ProjectFormValues) {
  const { data, error } = await supabase.from('projects').insert(payload).select().single();

  if (error) throw error;
  return data;
}
