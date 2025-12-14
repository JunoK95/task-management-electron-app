import styles from './Controls.module.scss';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function StatusFilter({ value, onChange }: Props) {
  return (
    <select
      className={styles.filterSelect}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Statuses</option>
      <option value="pending">Pending</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
  );
}
