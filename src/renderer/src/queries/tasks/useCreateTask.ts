import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTask } from '@/api/tasks';
import { Task, TaskFilters } from '@/types';

type TaskList = { data: Task[]; total: number };

export function useCreateTask(filters: TaskFilters) {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      const key = ['tasks', filters];

      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData<TaskList>(key);

      qc.setQueryData<TaskList>(key, (old) => {
        const optimisticTask = { ...newTask, id: 'optimistic-' + crypto.randomUUID() } as Task;
        if (!old) return { data: [optimisticTask], total: 1 };
        return { ...old, data: [...old.data, optimisticTask], total: old.total + 1 };
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

  return mutation;
}
