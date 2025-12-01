import { supabase } from '../../services/supabase/client';

export type TaskFilters = {
  projectId?: string;
  workspaceId?: string;
  ownerId?: string;
};

export type UpdateTaskInput = {
  id: string; // task id
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  status?: string;
  start_at?: string | null;
  due_at?: string | null;
  remind_at?: string | null;
};

export async function getTasks(filters: TaskFilters) {
  let query = supabase.from('tasks').select('*');

  if (filters.projectId) query = query.eq('project_id', filters.projectId);
  if (filters.workspaceId) query = query.eq('workspace_id', filters.workspaceId);
  if (filters.ownerId) query = query.eq('owner_id', filters.ownerId);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTask(payload: {
  title: string;
  owner_id: string;
  description?: string;
  project_id?: string;
  workspace_id?: string;
  priority?: string;
  start_at?: Date;
  due_at?: Date;
  reminder_at?: Date;
}) {
  const { data, error } = await supabase.from('tasks').insert([payload]).select().single();
  if (error) throw error;
  return data;
}

export async function updateTask(input: UpdateTaskInput) {
  const { id, ...fields } = input;

  const { data, error } = await supabase
    .from('tasks')
    .update(fields)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(taskId: string) {
  const { data, error } = await supabase.from('tasks').delete().eq('id', taskId).select().single();

  if (error) throw error;
  return data;
}
