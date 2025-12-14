import { useQuery } from '@tanstack/react-query';
import { getTasksPaged } from '../api/tasks';

export function useTasks(page: number, perPage: number) {
  return useQuery({
    queryKey: ['tasks', page, perPage],
    queryFn: () => getTasksPaged(page, perPage),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: false // optional, depending on your needs
  });
}
