import React from 'react';

import styles from './DatePicker.module.scss';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, id, defaultValue, ...rest }, ref) => {
    console.log('DatePicker defaultValue:', defaultValue);
    return (
      <div className={styles.datePickerWrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          type="datetime-local"
          defaultValue={defaultValue}
          id={id}
          className={styles.input}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

// ✅ THIS LINE FIXES THE ESLINT ERROR
DatePicker.displayName = 'DatePicker';

export default DatePicker;
