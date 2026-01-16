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
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
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
};
