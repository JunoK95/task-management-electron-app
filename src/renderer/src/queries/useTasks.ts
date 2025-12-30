import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getTasks, TaskFilters } from '@/api/tasks';
import { Task } from '@/types';

export function useTasks(filters: TaskFilters): UseQueryResult<{ data: Task[]; total: number }> {
  console.log('useTasks called with filters:', filters);
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasks(filters),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
