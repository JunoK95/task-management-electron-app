import React, { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import styles from './DateTimePicker.module.scss';

interface DateTimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  debouncedMs?: number;
}

/** UTC ISO → datetime-local */
function toDateTimeLocal(value?: string) {
  if (!value) return '';

  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** datetime-local → UTC ISO */
function fromDateTimeLocal(value: string) {
  return value ? new Date(value).toISOString() : '';
}

function formatDisplay(value?: string) {
  if (!value) return '';

  return new Date(value).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ label, debouncedMs = 500, placeholder, onChange, value, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const lastEmitted = useRef<string | undefined>(undefined);

    const [inputValue, setInputValue] = useState(toDateTimeLocal(value?.toString()));

    /** Sync external value (RHF reset, server updates) */
    useEffect(() => {
      const next = toDateTimeLocal(value?.toString());

      if (fromDateTimeLocal(inputValue) === value) return;

      setInputValue(next);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    /** Debounced emitter (native-compatible) */
    const emitChange = useDebouncedCallback((localValue: string) => {
      const iso = fromDateTimeLocal(localValue);
      if (iso === lastEmitted.current) return;

      lastEmitted.current = iso;

      const event = {
        target: { name: rest.name, value: iso }
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(event);
    }, debouncedMs);

    /** Merge refs */
    const setRefs = (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    const openPicker = () => {
      inputRef.current?.showPicker?.();
      inputRef.current?.focus();
    };

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}

        <button type="button" className={styles.selector} onClick={openPicker}>
          {inputValue
            ? formatDisplay(fromDateTimeLocal(inputValue)) // convert to ISO for display
            : (placeholder ?? 'Select date & time')}
        </button>

        <input
          {...rest}
          ref={setRefs}
          type="datetime-local"
          value={inputValue}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => {
            const local = e.target.value;
            setInputValue(local);
            emitChange(local);
          }}
          onBlur={() => emitChange.flush()}
          className={styles.nativeInput}
        />
      </div>
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';
export default DateTimePicker;
