import styles from './Separator.module.scss';

interface SeparatorProps {
  label?: string; // default "or"
}

export default function Separator({ label = '' }: SeparatorProps) {
  if (!label)
    return (
      <div className={styles.separator}>
        <span className={styles['separator__line']}></span>
      </div>
    );
  return (
    <div className={styles.separator}>
      <span className={styles['separator__line']}></span>
      <span className={styles['separator__label']}>{label}</span>
      <span className={styles['separator__line']}></span>
    </div>
  );
}
