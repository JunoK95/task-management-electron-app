import { TaskPriority, TaskStatus } from '../enums';

/**
 * Filters used by task queries
 */
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

/**
 * Input for creating a task
 * (API expects Dates, not strings)
 */
export type CreateTaskInput = {
  title: string;
  description?: string;
  owner_id?: string;
  workspace_id?: string;
  project_id?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
};

/**
 * Input for updating a task
 */
export type UpdateTaskInput = {
  id: string;
} & Partial<Omit<CreateTaskInput, 'title'>>;

export type TaskFormValues = {
  title: string;
  description?: string | null;
  workspace_id: string;
  project_id?: string | null;
  priority: TaskPriority | null;
  status: TaskStatus | null;
  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
};
