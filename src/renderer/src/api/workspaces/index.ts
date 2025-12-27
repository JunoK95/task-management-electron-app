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

async function createWorkspace(payload: { name: string }) {
  const { data, error } = await supabase.rpc('create_workspace', {
    _name: payload.name
  });

  if (error) throw error;
  return data; // workspace_id
}

export { getWorkspaces, getWorkspace, createWorkspace };
