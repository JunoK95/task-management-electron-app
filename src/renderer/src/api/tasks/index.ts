import { supabase } from '@/services/supabase/client';
import type { CreateTaskInput, Task, TaskUpdate } from '@/types';

export type TaskFilters = {
  projectId?: string | null;
  workspaceId?: string | null;
  ownerId?: string | null;
  priority?: Task['priority'] | 'all';
  status?: Task['status'] | 'all';
  search?: string | null;
  page?: number;
  perPage?: number;
};

export async function getTasks(filters: TaskFilters): Promise<{ data: Task[]; total: number }> {
  let query = supabase.from('tasks').select('*', { count: 'exact' });

  if (filters.projectId) query = query.eq('project_id', filters.projectId);
  if (filters.workspaceId) query = query.eq('workspace_id', filters.workspaceId);
  if (filters.ownerId) query = query.eq('owner_id', filters.ownerId);

  if (filters.priority && filters.priority !== 'all')
    query = query.eq('priority', filters.priority);

  if (filters.status && filters.status !== 'all') query = query.eq('status', filters.status);

  if (filters.search) query = query.ilike('title', `%${filters.search}%`);

  const page = filters.page ?? 1;
  const perPage = filters.perPage ?? 10;

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  if (error) throw error;

  return { data: data ?? [], total: count ?? 0 };
}

export async function getTaskById(id: string): Promise<Task> {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id).single();

  if (error) throw error;
  return data;
}

export async function createTask(payload: CreateTaskInput): Promise<Task> {
  const { data, error } = await supabase.from('tasks').insert(payload).select().single();

  if (error) throw error;
  return data;
}
export async function updateTask(input: TaskUpdate): Promise<Task> {
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

export async function deleteTask(id: string): Promise<Task> {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id).select().single();

  if (error) throw error;
  return data;
}
