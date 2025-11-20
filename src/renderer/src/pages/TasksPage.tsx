import { Link } from 'react-router-dom';

type Props = {};

function TasksPage({}: Props) {
  return (
    <div>
      <p>List of your tasks grouped by projects</p>
      <p>Search bar All Tasks with filters</p>
      <Link to="/tasks/new">Create New Task</Link>
      <Link to="/tasks/1">Go to task</Link>
    </div>
  );
}

export default TasksPage;
