import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getTaskById } from '@/api/tasks';
import { Task } from '@/types';

export function useTaskDetails(taskId?: string): UseQueryResult<Task> {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
    staleTime: 30_000
  });
}
