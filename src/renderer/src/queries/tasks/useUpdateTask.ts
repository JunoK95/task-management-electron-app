// hooks/tasks/useUpdateTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask } from '@/api/tasks';
import { optimisticPatchAutoLists } from '@/lib/react-query/optimisticPatchAutoLists';
import type { Task, UpdateTaskInput } from '@/types';
import { dateToString } from '@/utils/dateToString';

const patchDefined = (obj: UpdateTaskInput): Partial<Task> =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => {
        if (['start_at', 'due_at', 'remind_at'].includes(k)) {
          return [k, v !== undefined ? dateToString(v as Date | null) : undefined];
        }
        return [k, v];
      })
      .filter(([, v]) => v !== undefined)
  ) as Partial<Task>;

export function useUpdateTask(taskId: string, workspaceId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdateTaskInput) => updateTask(input),

    onMutate: async (updated) => {
      await qc.cancelQueries();

      const patch = patchDefined(updated);

      const optimistic = optimisticPatchAutoLists<Task>(qc, {
        entityKey: ['task', taskId],
        listPrefix: ['tasks', workspaceId],
        id: updated.id,
        patch
      });

      return optimistic;
    },

    onError: (_err, _vars, ctx) => {
      ctx?.rollback();
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['task', taskId] });
      qc.invalidateQueries({
        predicate: (q) =>
          Array.isArray(q.queryKey) && q.queryKey[0] === 'tasks' && q.queryKey[1] === workspaceId
      });
    }
  });
}
