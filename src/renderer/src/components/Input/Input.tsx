import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className={clsx(styles['input-wrapper'], className)}>
      <label className={styles['input-wrapper__label']}>{label}</label>
      <input
        className={clsx(styles['input-wrapper__input'], {
          [styles['input-wrapper__input--error']]: error
        })}
        {...props}
      />
      {error && <span className={styles['input-wrapper__error']}>{error}</span>}
    </div>
  );
}
