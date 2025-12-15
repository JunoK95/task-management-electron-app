import { useParams } from 'react-router-dom';

import { TaskForm } from '../../../components/Forms/TaskForm/TaskForm';
import { useAuth } from '../../../hooks/useAuth';
import { useTaskDetails } from '../../../queries/useTaskDetails';

function TaskDetailsPage({}) {
  const { session } = useAuth();

  const { id } = useParams<{ id: string }>();
  const { data } = useTaskDetails(id);

  console.log('Task Details:', id, data);
  return (
    <div>
      <TaskForm ownerId={session?.user.id} mode="update" initialValues={data} filters={[]} />
    </div>
  );
}

export default TaskDetailsPage;
