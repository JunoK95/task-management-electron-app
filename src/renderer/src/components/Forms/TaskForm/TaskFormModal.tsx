import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useCreateTask } from '@/queries/useCreateTask';
import { TaskInsert } from '@/types';

import CreateTaskFormSimple from './CreateTaskFormSimple';
import styles from './TaskFormModal.module.scss';

type Props = {
  workspaceId: string;
};

function TaskFormModal({ workspaceId }: Props) {
  const { closeTaskForm } = useModal();
  const createTask = useCreateTask({ workspaceId });

  const handleSubmit = (values: TaskInsert) => {
    createTask.mutate(
      { ...values, workspace_id: workspaceId },
      {
        onSuccess: () => {
          alert('Task created successfully!');
          closeTaskForm();
        }
      }
    );
  };

  const renderSection = () => {
    // Placeholder for Task Form content
    return (
      <div className={styles.container}>
        <CreateTaskFormSimple
          isLoading={createTask.isPending}
          onCancel={closeTaskForm}
          onSubmit={handleSubmit}
        />
      </div>
    );
  };

  return (
    <Modal open={true} onClose={closeTaskForm}>
      {renderSection()}
    </Modal>
  );
}

export default TaskFormModal;
