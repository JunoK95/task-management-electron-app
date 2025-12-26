import { supabase } from '../../services/supabase/client';

export type WorkspaceFormValues = {
  name: string;
  description: string;
  status: string;
};

async function getWorkspaces() {
  const { data, error } = await supabase.from('workspaces').select('*');
  if (error) throw error;
  return data;
}

async function getWorkspace(id: string) {
  const { data, error } = await supabase.from('workspaces').select('*').eq('id', id);
  if (error) throw error;
  return data[0];
}

async function createWorkspace(payload: WorkspaceFormValues) {
  const { data, error } = await supabase.from('workspaces').insert(payload).select().single();

  if (error) throw error;
  return data;
}

export { getWorkspaces, getWorkspace, createWorkspace };
