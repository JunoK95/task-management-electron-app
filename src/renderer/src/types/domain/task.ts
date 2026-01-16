import type { Tables } from '@/types/db';
import type { TaskPriority, TaskStatus } from '@/types/enums';

/**
 * Task as used in UI
 * - enums narrowed
 * - nullable fields normalized
 */
export type Task = Omit<Tables['tasks']['Row'], 'priority' | 'status'> & {
  priority: TaskPriority;
  status: TaskStatus;
};
