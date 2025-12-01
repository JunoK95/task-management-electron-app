import { supabase } from '../../services/supabase/client';

async function getWorkspaces() {
  const { data, error } = await supabase.from('workspaces').select('*');
  if (error) throw error;
  return data;
}

export { getWorkspaces };
