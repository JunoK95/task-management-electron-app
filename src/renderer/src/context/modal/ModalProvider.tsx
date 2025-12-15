import { ReactNode, useState } from 'react';

import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isSettingsOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false)
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
