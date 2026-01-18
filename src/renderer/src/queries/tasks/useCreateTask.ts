import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from '@/api/tasks';
import { TaskFilters } from '@/types';

export function useCreateTask(filters: TaskFilters) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      const key = ['tasks', filters];

      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData(key);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      qc.setQueryData(key, (old: any[] | undefined) => {
        if (!old) return [{ ...newTask, id: 'optimistic-' + crypto.randomUUID() }];
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

  return mutation; // returns the full mutation object, which includes isLoading
}
