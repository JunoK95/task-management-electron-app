import { ReactNode, useState } from 'react';

import { ModalContext } from './ModalContext';

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isSettingsOpen,
        isTaskFormOpen,
        openSettings: () => setIsSettingsOpen(true),
        closeSettings: () => setIsSettingsOpen(false),
        openTaskForm: () => setIsTaskFormOpen(true),
        closeTaskForm: () => setIsTaskFormOpen(false)
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
