import styles from './Separator.module.scss';

interface SeparatorProps {
  label?: string;
}

export default function Separator({ label }: SeparatorProps) {
  if (label) {
    return (
      <div className={styles.withLabel}>
        <span className={styles.labelText}>{label}</span>
      </div>
    );
  }
  return <hr className={styles.separator} />;
}
