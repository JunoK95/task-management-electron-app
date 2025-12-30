import { TaskPriority, TaskStatus } from '@/types/enums';

export type TaskFormValues = {
  title: string;
  description?: string;
  workspace_id: string;
  project_id?: string;

  priority: TaskPriority;
  status: TaskStatus;

  start_at?: Date | null;
  due_at?: Date | null;
  remind_at?: Date | null;
};
