import { TaskFilters } from '../../../../api/tasks';
import styles from './TaskTableFilters.module.scss';

type Props = {
  status: TaskFilters['status'];
  priority: TaskFilters['priority'];
  onStatusChange: (next: TaskFilters['status']) => void;
  onPriorityChange: (next: TaskFilters['priority']) => void;
};

const priorityOptions = ['all', 'low', 'medium', 'high'] as const;
const statusOptions = ['all', 'pending', 'in_progress', 'completed'] as const;

export default function TaskTableFilters({
  status,
  priority,
  onStatusChange,
  onPriorityChange
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <span className={styles.label}>Priority:</span>
        {priorityOptions.map((p) => (
          <button
            key={p}
            className={`${styles.pill} ${priority === p ? styles.active : ''}`}
            onClick={() => onPriorityChange(p)}
          >
            {p}
          </button>
        ))}
      </div>

      <div className={styles.group}>
        <span className={styles.label}>Status:</span>
        {statusOptions.map((s) => (
          <button
            key={s}
            className={`${styles.pill} ${status === s ? styles.active : ''}`}
            onClick={() => onStatusChange(s)}
          >
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
