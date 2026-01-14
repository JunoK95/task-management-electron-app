import { useMemo } from 'react';
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
  onChange: (name: string, value: string) => void;
};

function TaskDetailsPanel({ task, onChange }: Props) {
  const { workspaceId } = useParams();
  const { due_at, priority, status } = task;

  assertDefined(workspaceId, 'workspaceId is required');
  const { data: projects = [] } = useProjects(workspaceId);

  const projectOptions = useMemo(
    () =>
      projects.map((project) => ({
        label: project.name,
        value: project.id
      })),
    [projects]
  );

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

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (task[name] === value) return;

    onChange(name, value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <div className={styles.label}>Project</div>
        <Select
          value={task.project_id || undefined}
          options={projectOptions}
          name="project_id"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Status</div>
        <Select
          value={status || undefined}
          options={statusOptions}
          name="status"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Priority</div>
        <Select
          value={priority || undefined}
          options={priorityOptions}
          name="priority"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>Deadline</div>
        <DateTimePicker
          name="due_at"
          value={due_at ? due_at : undefined}
          onChange={handleInputChange}
        />
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
    </section>
  );
}

export default TaskDetailsPanel;
