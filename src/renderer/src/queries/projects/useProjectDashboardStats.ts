// queries/dashboard/useProjectDashboard.ts
import { useQuery } from '@tanstack/react-query';

import { getProjectDashboardStats } from '@/api/projects';

export function useProjectDashboardStats(projectId?: string) {
  return useQuery({
    enabled: !!projectId,
    queryKey: ['project-dashboard', projectId],
    queryFn: () => getProjectDashboardStats(projectId!),
    staleTime: 60_000
  });
}
