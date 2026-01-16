// hooks/tasks/useUpdateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask } from '@/api/tasks';
import type { Task, TaskFilters, TaskUpdate } from '@/types';
import { dateToString } from '@/utils/dateToString';

type TasksCache = {
  data: Task[];
  total: number;
};

export function useUpdateTask(filters: TaskFilters) {
  const qc = useQueryClient();
  const key = ['tasks', filters];

  return useMutation({
    mutationFn: (input: TaskUpdate) => updateTask(input),

    // -----------------------------------
    // ⭐ Optimistic Update
    // -----------------------------------
    onMutate: async (updated: TaskUpdate) => {
      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData<TasksCache>(key);

      const updatedForCache = {
        ...updated,
        start_at: dateToString(updated.start_at),
        due_at: dateToString(updated.due_at),
        remind_at: dateToString(updated.remind_at)
      };

      qc.setQueryData<TasksCache>(key, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((task) =>
            task.id === updated.id ? { ...task, ...updatedForCache } : task
          )
        };
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
