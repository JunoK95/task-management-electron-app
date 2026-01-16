import { useMutation, useQueryClient } from '@tanstack/react-query';

import { removeTagFromTask } from '@/api/tags';

export function useRemoveTagFromTask(taskId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: removeTagFromTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tags', 'task', taskId] });
    }
  });
}
