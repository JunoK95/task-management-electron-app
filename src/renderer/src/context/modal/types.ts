export type ModalContextType = {
  isSettingsOpen: boolean;
  isTaskFormOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  openTaskForm: () => void;
  closeTaskForm: () => void;
};
