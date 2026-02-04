import { useQuery } from '@tanstack/react-query';

import { getWorkspaceMembers } from '@/api/workspace_members';

export function useWorkspaceMembers(workspaceId: string) {
  return useQuery({
    queryKey: ['workspaceMembers', workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId),
    enabled: !!workspaceId
  });
}
