import React, { ReactNode } from 'react';

import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className={styles.card}>
      {title && <div className={styles.statTitle}>{title}</div>}
      <div className={styles.statContent}>{children}</div>
    </div>
  );
};

export default Card;
