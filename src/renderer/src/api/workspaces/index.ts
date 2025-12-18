import { supabase } from '../../services/supabase/client';

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

export { getWorkspaces, getWorkspace };
