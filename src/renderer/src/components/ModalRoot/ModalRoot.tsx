import { useModal } from '@/hooks/useModal';

import SettingsModal from './modals/settings/SettingsModal/SettingsModal';
import TagsFormModal from './modals/tags/TagsFormModal';
import TaskTagsModal from './modals/tags/TaskTagsModal';
import TaskFormModal from './modals/task/TaskFormModal';

export function ModalRoot() {
  const { modal, close } = useModal();

  switch (modal.type) {
    case 'settings':
      return <SettingsModal onClose={close} />;
    case 'task-create':
      return <TaskFormModal {...modal.payload} onClose={close} />;
    case 'tags-view':
      return;
    case 'tags-create':
      return <TagsFormModal {...modal.payload} onClose={close} />;
    case 'task-tags-view':
      return <TaskTagsModal {...modal.payload} onClose={close} />;
    case null:
    default:
      return null;
  }
}
