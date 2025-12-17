// validation/taskSchema.ts
import { z } from 'zod';

export const TaskFormSchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['pending', 'in_progress', 'completed']),
  start_at: z.string().nullable().optional(),
  due_at: z.string().nullable().optional(),
  remind_at: z.string().nullable().optional(),
  owner_id: z.string().nullable().optional(),
  project_id: z.string().nullable().optional(),
  workspace_id: z.string().nullable().optional()
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;
