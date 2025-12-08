import { useAuth } from '../../../hooks/useAuth';
import { TaskForm } from '../../../components/Forms/TaskForm/TaskForm';

type Props = {};

function NewTasksPage({}: Props) {
  const { session } = useAuth();

  return (
    <div>
      <h2>Create new task</h2>
      <TaskForm ownerId={session?.user.id} mode="create" filters={[]} />
    </div>
  );
}

export default NewTasksPage;
