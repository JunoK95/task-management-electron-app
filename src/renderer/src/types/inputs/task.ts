import type { TaskPriority, TaskStatus } from '../enums';

/* ===============================
   TASK INPUTS
================================ */

export type CreateTaskInput = {
  workspace_id: string;
  project_id?: string | null;
  title: string;
  description?: string | null;
  priority?: TaskPriority;
  status?: TaskStatus;
  start_at?: string | null;
  due_at?: string | null;
  remind_at?: string | null;
};

export type UpdateTaskInput = {
  id: string;
} & Partial<CreateTaskInput>;

export type TaskFilters = {
  projectId?: string | null;
  workspaceId?: string | null;
  ownerId?: string | null;
  priority?: TaskPriority | 'all';
  status?: TaskStatus | 'all';
  search?: string | null;
  page?: number;
  perPage?: number;
  upcomingDays?: number;
  includeOverdue?: boolean;
};
