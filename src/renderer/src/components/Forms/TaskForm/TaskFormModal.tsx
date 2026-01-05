import { useNavigate } from 'react-router-dom';

import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useCreateTask } from '@/queries/useCreateTask';
import { useProjects } from '@/queries/useProjects';
import { ROUTES } from '@/routes/routes';
import { TaskInsert } from '@/types';

import CreateTaskFormSimple from './CreateTaskFormSimple';
import styles from './TaskFormModal.module.scss';

type Props = {
  workspaceId: string;
};

function TaskFormModal({ workspaceId }: Props) {
  const { closeTaskForm } = useModal();
  const navigate = useNavigate();
  const { data: projects = [] } = useProjects(workspaceId);
  const createTask = useCreateTask({ workspaceId });

  const handleSubmit = (values: TaskInsert) => {
    createTask.mutate(
      { ...values, workspace_id: workspaceId },
      {
        onSuccess: (task) => {
          console.log('Task created:', task);
          alert('Task created successfully!');
          closeTaskForm();
          navigate(ROUTES.WORKSPACES.TASKS.DETAILS(workspaceId, task.id));
        }
      }
    );
  };

  const renderSection = () => {
    // Placeholder for Task Form content
    return (
      <div className={styles.container}>
        <CreateTaskFormSimple
          projects={projects}
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
