import { useQuery } from '@tanstack/react-query';

import { getProjectsByWorkspaceId } from '@/api/projects';

export function useProjects(workspaceId: string) {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: () => getProjectsByWorkspaceId(workspaceId),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
