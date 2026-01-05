import { useParams } from 'react-router-dom';

import { useTaskDetails } from '@/queries/useTaskDetails';
import { assertDefined } from '@/utils/assertDefined';

function TaskDetailsPage({}) {
  const { taskId } = useParams();
  const { data: task } = useTaskDetails(taskId);

  assertDefined(task, 'task is required');

  const { title, description, status } = task;
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {status}</p>
    </div>
  );
}

export default TaskDetailsPage;
