import { useParams } from 'react-router-dom';

import TaskDetailsPanel from '@/components/TaskDetailsPanel/TaskDetailsPanel';
import { useTaskDetails } from '@/queries/useTaskDetails';
import { useUpdateTask } from '@/queries/useUpdateTask';

import styles from './TaskDetailsPage.module.scss';

function TaskDetailsPage({}) {
  const { taskId } = useParams();
  const taskDetails = useTaskDetails(taskId);
  const updateTask = useUpdateTask({});

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

  const { title = '', description = ' ' } = task;

  const handleUpdate = (name: string, value: string) => {
    console.log(name, value);
    updateTask.mutate(
      { id: taskId, [name]: value },
      {
        onError: (e) => {
          console.error(e);
        },
        onSuccess: () => {
          alert('Updated Successfully');
        }
      }
    );
  };

  return (
    <div className={styles.page}>
      <h2>{title}</h2>
      <p>{description ? description : 'No Description'}</p>
      <div className={styles['details-panel']}>
        <TaskDetailsPanel task={task} onChange={handleUpdate} />
      </div>
    </div>
  );
}

export default TaskDetailsPage;
