import { useQuery } from '@tanstack/react-query';

import { getTagsByWorkspaceId } from '@/api/tags';

export function useWorkspaceTags(workspaceId: string) {
  return useQuery({
    queryKey: ['tags', 'workspace', workspaceId],
    queryFn: () => getTagsByWorkspaceId(workspaceId),
    enabled: !!workspaceId
  });
}
