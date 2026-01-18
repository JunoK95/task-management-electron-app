import React from 'react';

import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: string;
  id?: string;
  forwardRef?: React.Ref<HTMLSelectElement>;
  value?: string; // <-- add value
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, id, className, value, onChange, ...rest }, ref) => {
    return (
      <div className={styles.selectWrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <div style={{ position: 'relative' }}>
          <select
            id={id}
            className={`${styles.select} ${className || ''}`}
            ref={ref}
            value={value} // <-- controlled value
            onChange={onChange} // <-- propagate change
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.793l3.71-4.565a.75.75 0 111.14.977l-4.25 5.227a.75.75 0 01-1.14 0l-4.25-5.227a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
