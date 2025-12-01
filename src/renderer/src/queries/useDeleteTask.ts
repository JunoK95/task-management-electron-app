// src/hooks/tasks/useDeleteTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskFilters, deleteTask } from '../api/tasks';

export function useDeleteTask(filters: TaskFilters) {
  const qc = useQueryClient();
  const key = ['tasks', filters];

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: async (taskId: string) => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData(key);
      qc.setQueryData(key, (old: any[] | undefined) =>
        old ? old.filter((t) => t.id !== taskId) : old
      );
      return { previous };
    },
    onError: (_err, _taskId, ctx) => {
      if (ctx?.previous) qc.setQueryData(key, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key })
  });
}
