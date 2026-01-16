import { useQuery } from '@tanstack/react-query';

import { getTagsByTask } from '@/api/tags';

export function useTaskTags(taskId: string) {
  return useQuery({
    queryKey: ['tags', 'task', taskId],
    queryFn: () => getTagsByTask(taskId),
    enabled: !!taskId
  });
}
