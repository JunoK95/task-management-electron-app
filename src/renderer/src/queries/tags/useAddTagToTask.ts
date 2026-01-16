import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTagToTask } from '@/api/tags';

export function useAddTagToTask(taskId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: addTagToTask,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tags', 'task', taskId] });
    }
  });
}
