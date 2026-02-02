import { addDays } from 'date-fns';

import { supabase } from '@/services/supabase/client';
import type { CreateTaskInput, Task, TaskFilters, UpdateTaskInput } from '@/types';
import { dateToString } from '@/utils/dateToString';

export async function getTasks(filters: TaskFilters) {
  let query = supabase.from('tasks').select('*', { count: 'exact' });

  if (filters.projectId) query = query.eq('project_id', filters.projectId);
  if (filters.workspaceId) query = query.eq('workspace_id', filters.workspaceId);
  if (filters.ownerId) query = query.eq('owner_id', filters.ownerId);

  if (filters.priority && filters.priority !== 'all')
    query = query.eq('priority', filters.priority);

  if (filters.status && filters.status !== 'all') query = query.eq('status', filters.status);

  if (filters.search) query = query.ilike('title', `%${filters.search}%`);

  // 🔥 Upcoming tasks logic
  if (filters.upcomingDays) {
    const now = new Date();
    const futureDate = addDays(now, filters.upcomingDays);
    const nowISO = dateToString(now);
    const futureISO = dateToString(futureDate);

    console.log('Now ISO:', nowISO);
    console.log('Future ISO:', futureISO);

    query = query.gte('due_at', nowISO).lte('due_at', futureISO);
  }

  // Optional overdue include
  // TODO: Fix this to work with upcomingDays filter
  if (filters.includeOverdue) {
    const now = new Date();
    const nowISO = dateToString(now);
    query = query.or(`due_at.lt.${nowISO},due_at.is.null`);
  }

  const page = filters.page ?? 1;
  const perPage = filters.perPage ?? 10;

  const { data, error, count } = await query
    .order('due_at', { ascending: true }) // upcoming tasks sorted by due date
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
export async function updateTask(input: UpdateTaskInput): Promise<Task> {
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
