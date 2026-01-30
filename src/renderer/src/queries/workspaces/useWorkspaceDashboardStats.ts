// queries/dashboard/useWorkspaceDashboard.ts
import { useQuery } from '@tanstack/react-query';

import { getWorkspaceDashboardStats } from '@/api/workspaces';

export function useWorkspaceDashboard(workspaceId?: string) {
  return useQuery({
    enabled: !!workspaceId,
    queryKey: ['workspace-dashboard', workspaceId],
    queryFn: () => getWorkspaceDashboardStats(workspaceId!)
  });
}
