import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import styles from './SearchBar.module.scss';

type Props = {
  value: string;
  onChange: (v: string) => void;
  debounceMs?: number;
};

export default function SearchBar({ value, onChange, debounceMs = 300 }: Props) {
  const [internalValue, setInternalValue] = useState(value);
  const [debouncedValue] = useDebounce(internalValue, debounceMs);

  // Push debounced value to parent
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Search tasks..."
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
    />
  );
}
