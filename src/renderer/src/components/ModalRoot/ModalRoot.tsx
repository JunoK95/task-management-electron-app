import { useModal } from '@/hooks/useModal';

import SettingsModal from './modals/settings/SettingsModal/SettingsModal';
import TaskFormModal from './modals/task/TaskFormModal';

export function ModalRoot() {
  const { modal, close } = useModal();

  switch (modal.type) {
    case 'settings':
      return <SettingsModal onClose={close} />;

    case 'task-create':
      return <TaskFormModal {...modal.payload} onClose={close} />;

    case 'tags-view':
    case null:
    default:
      return null;
  }
}
