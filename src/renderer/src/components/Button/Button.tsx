import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  const buttonClass = styles[`button--${variant}`] || '';
  return (
    <button className={`${styles.button} ${buttonClass}`} {...props}>
      {children}
    </button>
  );
}
