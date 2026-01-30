import { supabase } from '@/services/supabase/client';
import { Workspace } from '@/types';

export type WorkspaceFormValues = {
  name: string;
  description: string;
  status: string;
};

async function getWorkspaces(): Promise<Workspace[]> {
  const { data, error } = await supabase.from('workspaces').select('*');
  if (error) throw error;
  return data;
}

async function getWorkspace(id: string): Promise<Workspace> {
  const { data, error } = await supabase.from('workspaces').select('*').eq('id', id);
  if (error) throw error;
  return data[0];
}

async function createWorkspace(payload: { name: string }) {
  const { data, error } = await supabase.rpc('create_workspace', {
    _name: payload.name
  });

  if (error) throw error;
  return data;
}

async function getWorkspaceDashboardStats(workspaceId: string) {
  const { data, error } = await supabase
    .from('workspace_dashboard_stats')
    .select('*')
    .eq('workspace_id', workspaceId)
    .single();

  if (error) throw error;
  return data;
}

export { getWorkspaces, getWorkspace, createWorkspace, getWorkspaceDashboardStats };
