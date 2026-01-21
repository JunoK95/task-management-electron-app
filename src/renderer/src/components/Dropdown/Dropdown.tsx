import { useState, useRef, useEffect, cloneElement, ReactElement } from 'react';

import styles from './Dropdown.module.scss';

type Clickable = {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  'aria-haspopup'?: string;
  'aria-expanded'?: boolean;
};

interface DropdownProps {
  trigger: ReactElement<Clickable>;
  children: React.ReactNode;
  align?: 'left' | 'right';
}

export default function Dropdown({ trigger, children, align = 'left' }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {cloneElement(trigger, {
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          trigger.props.onClick?.(e);
          setOpen((v) => !v);
        },
        'aria-haspopup': 'menu',
        'aria-expanded': open
      })}

      {open && <div className={`${styles.menu} ${styles[`menu--${align}`]}`}>{children}</div>}
    </div>
  );
}
