import { TaskForm } from '../../../components/Forms/TaskForm/TaskForm';
import { useAuth } from '../../../hooks/useAuth';

function NewTasksPage({}) {
  const { session } = useAuth();

  return (
    <div>
      <h2>Create new task</h2>
      <TaskForm ownerId={session?.user.id} mode="create" filters={[]} />
    </div>
  );
}

export default NewTasksPage;
