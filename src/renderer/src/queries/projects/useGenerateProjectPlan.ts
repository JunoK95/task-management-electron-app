import { useMutation, useQueryClient } from '@tanstack/react-query';

import { generateProjectPlan } from '@/api/projects';
import { Task } from '@/types';

export function useGenerateProjectPlan(projectId: string, workspaceId: string) {
  const qc = useQueryClient();
  const queryKey = ['generated-plan', projectId, workspaceId];

  return useMutation({
    mutationFn: (): Promise<Task[]> => {
      const cached = qc.getQueryData<Task[]>(queryKey);
      if (cached) return Promise.resolve(cached);
      return generateProjectPlan({ projectId, workspaceId });
    },
    onSuccess: (tasks) => {
      qc.setQueryData(queryKey, tasks);
      qc.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
}
