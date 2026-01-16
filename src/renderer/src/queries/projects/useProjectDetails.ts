import { useQuery } from '@tanstack/react-query';

import { getProjectById } from '@/api/projects';

export function useProjectDetails(projectId: string) {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
