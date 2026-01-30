import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getTasks } from '@/api/tasks';
import { Task, TaskFilters } from '@/types';

export function useTasks(filters: TaskFilters): UseQueryResult<{ data: Task[]; total: number }> {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasks(filters),
    staleTime: 5000,
    retry: false,
    refetchOnWindowFocus: true
  });
}
