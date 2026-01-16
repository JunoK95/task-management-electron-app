import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTag } from '@/api/tags';

export function useCreateTag(workspaceId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tags', 'workspace', workspaceId] });
    }
  });
}
