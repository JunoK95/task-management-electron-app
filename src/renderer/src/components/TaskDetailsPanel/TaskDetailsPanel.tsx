import { useParams } from 'react-router-dom';

import { useProjects } from '@/queries/useProjects';
import { Task } from '@/types';
import { TaskPriority, TaskStatus } from '@/types/enums';
import { assertDefined } from '@/utils/assertDefined';

import styles from './TaskDetailsPanel.module.scss';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Pill from '../Pill/Pill';
import Select from '../Select/Select';

type Props = {
  task: Task;
};

function TaskDetailsPanel({ task }: Props) {
  const { workspaceId } = useParams();
  const { due_at, priority, status } = task;

  assertDefined(workspaceId, 'workspaceId is required');
  const { data: projects = [] } = useProjects(workspaceId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const projectOptions = projects?.map((project) => ({
    label: project.name,
    value: project.id
  }));

  const statusOptions: { label: string; value: TaskStatus }[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Completed', value: 'completed' }
  ];

  const priorityOptions: { label: string; value: TaskPriority }[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Urgent', value: 'urgent' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.label}>Project</div>
        <Select defaultValue={task.project_id || undefined} options={projectOptions} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Status</div>
        <Select defaultValue={status || undefined} options={statusOptions} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Priority</div>
        <Select defaultValue={priority || undefined} options={priorityOptions} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Deadline</div>
        <DateTimePicker value={due_at ? due_at : ''} onChange={handleChange} />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Tags</div>
        <div className={styles.tagsGroup}>
          <Pill label="Pill" />
          <Pill label="success" type="success" />
          <Pill label="Error" type="error" />
          <Pill label="Warning" type="warning" />
          <Pill label="Blue" type="blue" onClick={() => {}} />
          <Pill label="+ add" type="invert" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPanel;
