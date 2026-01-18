// modal/ModalContext.ts
import { createContext } from 'react';

import type { ModalPayloads, ModalState, ModalType } from './types';

export interface ModalContextValue {
  modal: ModalState;
  open: <K extends ModalType>(
    type: K,
    ...payload: ModalPayloads[K] extends void ? [] : [ModalPayloads[K]]
  ) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);
