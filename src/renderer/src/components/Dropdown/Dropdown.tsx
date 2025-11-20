import { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
  label: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export default function Dropdown({ label, children, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setOpen((v) => !v)}>
        {label}
      </button>

      {open && <div className={`${styles.menu} ${styles[`menu--${align}`]}`}>{children}</div>}
    </div>
  );
}
