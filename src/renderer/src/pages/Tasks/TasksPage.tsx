import { Link } from 'react-router-dom';
import { useTasks } from '../../queries/useTasks';
import { useAuth } from '../../hooks/useAuth';

type Props = {};

function TasksPage({}: Props) {
  const { session } = useAuth();
  const { data } = useTasks({ ownerId: session?.user.id || '' });
  console.log('Tasks', data);
  return (
    <div>
      <p>List of your tasks grouped by projects</p>
      <p>Search bar All Tasks with filters</p>
      {data?.length === 0 && <p>No tasks found.</p>}
      {data?.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
      {/* Links for testing navigation */}
      <Link to="/tasks/new">Create New Task</Link>
      <Link to="/tasks/1">Go to task</Link>
    </div>
  );
}

export default TasksPage;
