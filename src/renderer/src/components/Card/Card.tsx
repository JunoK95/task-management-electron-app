import clsx from 'clsx';
import React, { ReactNode } from 'react';

import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, children, className, onClick }) => {
  return (
    <div className={clsx(styles.card, className)} onClick={onClick}>
      {title && <div className={styles.statTitle}>{title}</div>}
      <div className={styles.statContent}>{children}</div>
    </div>
  );
};

export default Card;
