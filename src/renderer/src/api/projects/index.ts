import { supabase } from '@/services/supabase/client';
import { Project, ProjectFormValues, Task } from '@/types';

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

export async function getProjectDashboardStats(projectId: string) {
  const { data, error } = await supabase
    .from('project_dashboard_stats')
    .select('*')
    .eq('project_id', projectId)
    .single();

  if (error) throw error;
  return data;
}

export async function generateProjectPlan({
  projectId,
  workspaceId
}: {
  projectId: string;
  workspaceId: string;
}): Promise<Task[]> {
  const { data, error } = await supabase.functions.invoke('generate-project-plan', {
    body: { workspace_id: workspaceId, project_id: projectId }
  });

  if (error) throw error;
  return (data as { tasks: Task[] }).tasks ?? [];
}
