// modal/types.ts
export type ModalPayloads = {
  settings: void;
  'tags-view': { taskId: string };
  'task-create': { workspaceId: string; projectId?: string };
  'task-view': { taskId: string };
  'task-edit': { taskId: string };
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
