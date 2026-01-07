import { Task } from '@/types';

import styles from './TaskDetailsPanel.module.scss';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

type Props = {
  task: Task;
};

function TaskDetailsPanel({ task }: Props) {
  const { due_at, created_at, priority } = task;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div>
        <DateTimePicker label="Deadline" value={due_at ? due_at : ''} onChange={handleChange} />
      </div>
      <div>
        <DateTimePicker
          label="Created date"
          value={created_at ? created_at : ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <div>Priority: {priority}</div>
      </div>
      <pre>{JSON.stringify(task, null, 2)}</pre>
    </div>
  );
}

export default TaskDetailsPanel;
