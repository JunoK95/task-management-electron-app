import { useContext } from 'react';

import { ModalContext } from '../context/modal/ModalContext';

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');

  return {
    ...ctx,

    // payload-less modal
    openSettings: () => ctx.open('settings'),

    // require workspaceId when opening create task
    openCreateTask: (workspaceId: string, projectId?: string) => {
      console.log(workspaceId, projectId);
      ctx.open('task-create', { workspaceId, projectId });
    },

    // pass taskId
    openViewTask: (taskId: string) => ctx.open('task-view', { taskId }),
    openEditTask: (taskId: string) => ctx.open('task-edit', { taskId }),
    openViewTags: (taskId: string) => ctx.open('tags-view', { taskId })
  };
}
