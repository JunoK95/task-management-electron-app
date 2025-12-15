// hooks/tasks/useUpdateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask, UpdateTaskInput, TaskFilters } from '../api/tasks';

export function useUpdateTask(filters: TaskFilters) {
  const qc = useQueryClient();
  const key = ['tasks', filters];

  return useMutation({
    mutationFn: updateTask,

    // -----------------------------------
    // ⭐ Optimistic Update
    // -----------------------------------
    onMutate: async (updated: UpdateTaskInput) => {
      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData(key);

      qc.setQueryData(key, (old: any[] | undefined) => {
        if (!old) return old;

        return old.map((task) => (task.id === updated.id ? { ...task, ...updated } : task));
      });

      return { previous };
    },

    // -----------------------------------
    // ❗ Rollback on failure
    // -----------------------------------
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(key, ctx.previous);
      }
    },

    // -----------------------------------
    // 🔄 Always refetch server truth
    // -----------------------------------
    onSettled: () => {
      qc.invalidateQueries({ queryKey: key });
    }
  });
}
