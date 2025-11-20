import { useState, useRef, useEffect } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import clsx from 'clsx';
import styles from './CollapsibleSection.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onTitleClick?: () => void;
  onPlusClick?: () => void;
};

export default function CollapsibleSection({
  title,
  children,
  defaultOpen = true,
  onTitleClick,
  onPlusClick
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (open) {
      const scrollHeight = contentRef.current?.scrollHeight ?? 0;
      setHeight(scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className={styles.section}>
      {/* Header */}
      <div className={styles.section__header}>
        <div className={styles.section__header__title} onClick={onTitleClick}>
          <span>{title}</span>
        </div>
        <div className={styles.section__header__right}>
          {onPlusClick && (
            <button onClick={onPlusClick}>
              <Plus className={clsx(styles.section__icon)} size={16} />
            </button>
          )}
          <button onClick={() => setOpen((prev) => !prev)}>
            <ChevronRight
              className={clsx(styles.section__icon, open && styles['section__icon--open'])}
              size={16}
            />
          </button>
        </div>
      </div>

      {/* Animated container */}
      <div className={styles.section__outer} style={{ maxHeight: height }}>
        <div ref={contentRef} className={styles.section__content}>
          {children}
        </div>
      </div>

      {/* Divider */}
      <div className={styles.section__divider} />
    </div>
  );
}
