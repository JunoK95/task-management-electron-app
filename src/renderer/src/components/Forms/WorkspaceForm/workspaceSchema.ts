import { z } from 'zod';

export const workspaceSchema = z.object({
  name: z.string().min(1, 'Project name is required')
});

export type WorkspaceFormValues = z.infer<typeof workspaceSchema>;
