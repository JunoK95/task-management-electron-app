import React from 'react';

import styles from './ColorPickerOpenButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color: string; // hex
};

export default function ColorPickerOpenButton({ color, children, ...buttonProps }: Props) {
  return (
    <button type="button" className={styles.button} {...buttonProps}>
      <span className={styles.swatch} style={{ background: color }} aria-hidden />
      <span className={styles.label}>{children ?? color.toUpperCase()}</span>
    </button>
  );
}
