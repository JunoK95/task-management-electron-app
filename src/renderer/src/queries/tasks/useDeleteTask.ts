// src/hooks/tasks/useDeleteTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/api/tasks';
import { Task, TaskFilters } from '@/types';

type TaskList = { data: Task[]; total: number };

export function useDeleteTask(filters: TaskFilters) {
  const qc = useQueryClient();
  const key = ['tasks', filters];

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: async (taskId: string) => {
      await qc.cancelQueries({ queryKey: key });
      const previous = qc.getQueryData<TaskList>(key);
      qc.setQueryData<TaskList>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((t) => t.id !== taskId),
          total: Math.max(0, old.total - 1)
        };
      });
      return { previous };
    },
    onError: (_err, _taskId, ctx) => {
      if (ctx?.previous) qc.setQueryData(key, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: key })
  });
}
