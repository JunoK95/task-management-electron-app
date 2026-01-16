import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getProjectsByWorkspaceId } from '@/api/projects';
import { Project } from '@/types';

export function useProjects(workspaceId: string): UseQueryResult<Project[]> {
  return useQuery({
    queryKey: ['projects', workspaceId],
    queryFn: () => getProjectsByWorkspaceId(workspaceId),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
