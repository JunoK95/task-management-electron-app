import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getWorkspace } from '@/api/workspaces';

export function useCurrentWorkspace() {
  const { workspaceId = '' } = useParams();

  return useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getWorkspace(workspaceId),
    enabled: !!workspaceId
  });
}
