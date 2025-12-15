import { useQuery } from '@tanstack/react-query';

import { getTaskById } from '../api/tasks';

export function useTaskDetails(taskId?: string) {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
    staleTime: 30_000
  });
}
