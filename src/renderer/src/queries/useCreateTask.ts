// hooks/tasks/useCreateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, TaskFilters } from '../api/tasks';

export function useCreateTask(filters: TaskFilters) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    // ⭐ Optimistic Update ⭐
    onMutate: async (newTask) => {
      const key = ['tasks', filters];

      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData(key);

      qc.setQueryData(key, (old: any[] | undefined) => {
        if (!old) return [newTask];
        return [...old, { ...newTask, id: 'optimistic-' + crypto.randomUUID() }];
      });

      return { previous };
    },

    onError: (_err, _newTask, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(['tasks', filters], ctx.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['tasks', filters] });
    }
  });
}
