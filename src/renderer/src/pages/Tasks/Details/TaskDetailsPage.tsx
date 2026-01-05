import { useParams } from 'react-router-dom';

import { useTaskDetails } from '@/queries/useTaskDetails';

function TaskDetailsPage({}) {
  const { taskId } = useParams();
  const taskDetails = useTaskDetails(taskId);

  if (taskDetails.isPending) {
    return <div>Loading...</div>;
  }

  if (taskDetails.isError) {
    return <div>Error loading task details.</div>;
  }

  if (!taskDetails.data) {
    return <div>No task found.</div>;
  }

  const task = taskDetails.data;

  const { title = '', description = ' ', status = '' } = task;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default TaskDetailsPage;
