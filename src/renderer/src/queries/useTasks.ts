import { useQuery } from '@tanstack/react-query';
import { getTasks, TaskFilters } from '../api/tasks';

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: ['tasks', filters], // cache is per-filter combo
    queryFn: () => getTasks(filters),
    enabled: Object.values(filters).some(Boolean) // only run if a filter is provided
  });
}
