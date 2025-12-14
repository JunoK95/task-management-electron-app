import styles from './Controls.module.scss';

type Props = {
  value: number;
  onChange: (v: number) => void;
};

export function PageSizeSelect({ value, onChange }: Props) {
  return (
    <select
      className={styles.pageSizeSelect}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      <option value={5}>5 rows</option>
      <option value={10}>10 rows</option>
      <option value={20}>20 rows</option>
      <option value={50}>50 rows</option>
    </select>
  );
}
