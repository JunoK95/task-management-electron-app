import type { TaskRow } from '@/types/db';
import type { TaskPriority, TaskStatus } from '@/types/enums';

/**
 * Task as used in UI
 * - enums narrowed
 * - nullable fields normalized
 */
export type Task = Omit<TaskRow, 'priority' | 'status'> & {
  priority: TaskPriority;
  status: TaskStatus;
};
