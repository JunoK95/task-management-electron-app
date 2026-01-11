import { useParams } from 'react-router-dom';

import TaskDetailsPanel from '@/components/TaskDetailsPanel/TaskDetailsPanel';
import { useTaskDetails } from '@/queries/useTaskDetails';

import styles from './TaskDetailsPage.module.scss';

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
    <div className={styles.page}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>Status: {status}</p>
      <div className={styles['details-panel']}>
        <TaskDetailsPanel task={task} />
      </div>
    </div>
  );
}

export default TaskDetailsPage;
