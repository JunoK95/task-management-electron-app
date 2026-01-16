import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Task } from '@/types';

import { getTaskById } from '../api/tasks';

export function useTaskDetails(taskId?: string): UseQueryResult<Task> {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
    staleTime: 30_000
  });
}
