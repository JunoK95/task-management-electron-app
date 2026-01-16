import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getWorkspace } from '@/api/workspaces';
import { Workspace } from '@/types';

export function useCurrentWorkspace(): UseQueryResult<Workspace> {
  const { workspaceId = '' } = useParams();

  return useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getWorkspace(workspaceId),
    enabled: !!workspaceId
  });
}
