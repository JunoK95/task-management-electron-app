import { useNavigate } from 'react-router-dom';

import CreateTaskFormSimple from '@/components/Forms/TaskForm/CreateTaskFormSimple';
import Modal from '@/components/Modal/Modal';
import { useProjects } from '@/queries/projects/useProjects';
import { useCreateTask } from '@/queries/tasks/useCreateTask';
import { ROUTES } from '@/routes/routes';
import { CreateTaskInput } from '@/types';

import styles from './TaskFormModal.module.scss';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

function TaskFormModal({ workspaceId, onClose }: Props) {
  const navigate = useNavigate();
  const { data: projects = [] } = useProjects(workspaceId);
  const createTask = useCreateTask({ workspaceId });

  const handleSubmit = (values: CreateTaskInput) => {
    console.log('creating with', values);
    createTask.mutate(
      {
        ...values,
        project_id: values.project_id ? values.project_id : null,
        workspace_id: workspaceId
      },
      {
        onSuccess: (task) => {
          alert('Task created successfully!');
          onClose();
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
          onCancel={onClose}
          onSubmit={handleSubmit}
        />
      </div>
    );
  };

  return (
    <Modal open={true} onClose={onClose}>
      {renderSection()}
    </Modal>
  );
}

export default TaskFormModal;
