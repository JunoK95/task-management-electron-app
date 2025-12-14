import { supabase } from '../../services/supabase/client';

export type TaskFilters = {
  projectId?: string | null;
  workspaceId?: string | null;
  ownerId?: string | null;
  priority?: 'low' | 'medium' | 'high' | 'all';
  status?: 'pending' | 'in_progress' | 'completed' | 'all';
  search?: string | null; // text search
  page?: number; // 1-based
  perPage?: number;
};

export type UpdateTaskInput = {
  id: string; // task id
  owner_id?: string;
  project_id?: string;
  workspace_id?: string;
  title?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: string;
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'normal' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
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

  // Pagination
  const page = filters.page ?? 1;
  const perPage = filters.perPage ?? 10;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  // Sort newest first
  query = query.order('created_at', { ascending: false });

  const { data, error, count } = await query;

  if (error) throw error;
  return { data: data || [], total: count || 0 };
}

export async function getTasksPaged(page: number, perPage: number) {
  console.log(`Fetching page ${page}`);
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count, error } = await supabase
    .from('tasks')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Fetch error:', error);
    throw error;
  }

  console.log(`Fetched page ${page}:`, { data, count });
  return {
    data: data ?? [],
    total: count ?? 0
  };
}

export async function getTaskById(taskId: string) {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', taskId).single();

  if (error) throw error;
  return data;
}

export async function createTask(payload: {
  title: string;
  owner_id?: string;
  description?: string;
  project_id?: string;
  workspace_id?: string;
  priority?: string;
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
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
