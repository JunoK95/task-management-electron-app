import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { getWorkspaces } from '@/api/workspaces';
import { Workspace } from '@/types';

export function useWorkspaces(): UseQueryResult<Workspace[]> {
  return useQuery({
    queryKey: ['workspaces'],
    queryFn: () => getWorkspaces(),
    staleTime: 5000,
    retry: false, // Add this to prevent infinite retries on errors
    refetchOnWindowFocus: true
  });
}
