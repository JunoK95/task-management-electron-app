import styles from './StatusDot.module.scss';

type Status = 'success' | 'warning' | 'error' | 'info' | 'neutral';

type Size = 'sm' | 'md' | 'lg';

type Props = {
  status?: Status;
  size?: Size;
  pulse?: boolean; // 👈 NEW
  color?: string;
  className?: string;
  ariaLabel?: string;
};

function StatusDot({
  status = 'neutral',
  size = 'md',
  pulse = false,
  color,
  className,
  ariaLabel
}: Props) {
  return (
    <span
      className={`
        ${styles.dot}
        ${styles[status]}
        ${styles[size]}
        ${pulse ? styles.pulse : ''}
        ${className ?? ''}
      `}
      style={color ? { backgroundColor: color } : undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
    />
  );
}

export default StatusDot;
