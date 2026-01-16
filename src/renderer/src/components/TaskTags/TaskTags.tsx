import { X } from 'lucide-react';

import styles from './TaskTags.module.scss';

type Props = {
  label?: string;
  color?: string;
  onClick?: () => void;
  onDeleteClick?: () => void;
};

function TaskTags({ label = 'title', color, onClick, onDeleteClick }: Props) {
  return (
    <div className={styles.tag} style={{ borderColor: color }} onClick={onClick}>
      <div className={styles.text}>{label}</div>
      {onDeleteClick && (
        <div
          className={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            if (onDeleteClick) {
              onDeleteClick();
            }
          }}
        >
          <X size={12} />
        </div>
      )}
    </div>
  );
}

export default TaskTags;
