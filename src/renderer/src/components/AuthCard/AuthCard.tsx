import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './AuthCard.module.scss';

interface AuthCardProps {
  title?: string;
  error?: string;
  children: ReactNode;
}

export default function AuthCard({ title, error, children }: AuthCardProps) {
  return (
    <div className={clsx(styles['auth-card'], { [styles['auth-card--error']]: error })}>
      {title && <h2 className={styles['auth-card__title']}>{title}</h2>}
      {error && <div className={styles['auth-card__error-message']}>{error}</div>}
      {children}
    </div>
  );
}
