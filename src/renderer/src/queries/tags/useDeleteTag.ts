import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTag } from '@/api/tags';

export function useDeleteTag(workspaceId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tags', 'workspace', workspaceId] });
    }
  });
}
