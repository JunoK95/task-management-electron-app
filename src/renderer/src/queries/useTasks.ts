import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, getTasks, TaskFilters } from '../api/tasks';

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: ['tasks', filters], // cache is per-filter combo
    queryFn: () => getTasks(filters),
    enabled: Object.values(filters).some(Boolean) // only run if a filter is provided
  });
}
export function useCreateTask(owner_id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      createTask({ owner_id, ...data }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks', owner_id] });
    }
  });
}
