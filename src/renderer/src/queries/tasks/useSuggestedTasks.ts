import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getTaskSuggestions } from '@/api/tasks';
import { SuggestedTask, SuggestedTaskFilters } from '@/types';

export function useSuggestedTasks(filters: SuggestedTaskFilters): UseQueryResult<SuggestedTask[]> {
  return useQuery({
    queryKey: ['task-suggestions', filters],
    queryFn: () => getTaskSuggestions(filters),
    staleTime: 5000,
    retry: false,
    refetchOnWindowFocus: true
  });
}
