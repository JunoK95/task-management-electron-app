import { useModal } from '@/hooks/useModal';

import TaskFormModal from '../Forms/TaskForm/TaskFormModal';
import SettingsModal from '../settings/SettingsModal/SettingsModal';

export function ModalRoot() {
  const { modal, close } = useModal();

  console.log('In Modal Root', modal);

  switch (modal.type) {
    case 'settings':
      return <SettingsModal onClose={close} />;

    case 'task-create':
      return <TaskFormModal {...modal.payload} onClose={close} />;

    case null:
    default:
      return null;
  }
}
