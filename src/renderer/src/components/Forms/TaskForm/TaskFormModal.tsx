import { useNavigate } from 'react-router-dom';

import Modal from '@/components/Modal/Modal';
import { useModal } from '@/hooks/useModal';
import { useProjects } from '@/queries/projects/useProjects';
import { useCreateTask } from '@/queries/tasks/useCreateTask';
import { ROUTES } from '@/routes/routes';
import { CreateTaskInput } from '@/types';

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

  const handleSubmit = (values: CreateTaskInput) => {
    createTask.mutate(
      {
        ...values,
        project_id: values.project_id ? values.project_id : null,
        workspace_id: workspaceId
      },
      {
        onSuccess: (task) => {
          alert('Task created successfully!');
          closeTaskForm();
          navigate(ROUTES.WORKSPACES.TASKS.DETAILS(workspaceId, task.id));
        }
      }
    );
  };

  const renderSection = () => {
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
