import type { TaskRow } from '@/types/db';
import type { TaskPriority, TaskStatus } from '@/types/enums';

import { Project } from './project';

/**
 * Task as used in UI
 * - enums narrowed
 * - nullable fields normalized
 */
export type Task = Omit<TaskRow, 'priority' | 'status'> & {
  priority: TaskPriority;
  status: TaskStatus;
  project: Partial<Project>;
};

export type SuggestedTask = {
  task_id: string;
  score: number;
  reason: string;
};
