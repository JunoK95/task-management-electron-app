import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createWorkspace } from '@/api/workspaces';

export function useCreateWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { name: string }) => createWorkspace(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['workspaces'] });
    }
  });
}
