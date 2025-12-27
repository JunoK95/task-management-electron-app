import { useQuery } from '@tanstack/react-query';

import { getTasks, TaskFilters } from '../api/tasks';

export function useTasks(filters: TaskFilters) {
  console.log('useTasks called with filters:', filters);
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasks(filters),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
