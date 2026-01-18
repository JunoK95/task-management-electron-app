import { useCallback, useState } from 'react';

import { ModalContext } from './ModalContext';
import { createModalState, type ModalPayloads, type ModalState, type ModalType } from './types';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const open = useCallback(
    <K extends ModalType>(
      type: K,
      ...payload: ModalPayloads[K] extends void ? [] : [ModalPayloads[K]]
    ) => {
      setModal(createModalState(type, payload[0] as ModalPayloads[K]));
    },
    []
  );

  const close = useCallback(() => {
    setModal({ type: null });
  }, []);

  return <ModalContext.Provider value={{ modal, open, close }}>{children}</ModalContext.Provider>;
}
