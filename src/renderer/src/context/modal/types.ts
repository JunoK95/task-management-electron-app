import { Task } from '@/types';

// modal/types.ts
export type ModalPayloads = {
  settings: void;
  'tags-view': { taskId: string };
  'tags-create': { workspaceId: string };
  'task-create': { workspaceId: string; projectId?: string };
  'task-view': { taskId: string };
  'task-edit': { taskId: string };
  'task-tags-view': { workspaceId: string; taskId: string };
  'generated-tasks': { tasks: Task[]; isLoading: boolean; projectId: string; workspaceId: string };
};

export type ModalType = keyof ModalPayloads;

export type ModalState =
  | { type: null }
  | {
      [K in ModalType]: {
        type: K;
        payload: ModalPayloads[K];
      };
    }[ModalType];

export function createModalState<K extends ModalType>(
  type: K,
  payload: ModalPayloads[K]
): Extract<ModalState, { type: K }> {
  return {
    type,
    payload
  } as Extract<ModalState, { type: K }>;
}
