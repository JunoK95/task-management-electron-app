import React from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...rest }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ''} ${className || ''}`}
          {...rest}
        />
        {error && <span className={styles.hint}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
