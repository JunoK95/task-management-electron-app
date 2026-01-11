import React, { useState } from 'react';

import { themeVariables } from '@/styles/themeColors';

import styles from './Pill.module.scss';

interface PillProps {
  label: string;
  type?: string;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({ label, type = 'default', onClick }) => {
  const colorSets = {
    default: {
      backgroundColor: '#e0e0e0',
      color: '#000'
    },
    invert: {
      backgroundColor: 'transparent',
      borderColor: '#e0e0e0',
      color: '#e0e0e0'
    },
    success: {
      backgroundColor: themeVariables.success,
      color: themeVariables.text
    },
    green: {
      backgroundColor: themeVariables.success,
      color: themeVariables.text
    },
    error: {
      backgroundColor: themeVariables.error,
      color: themeVariables.text
    },
    red: {
      backgroundColor: themeVariables.error,
      color: themeVariables.text
    },
    warning: {
      backgroundColor: themeVariables.warning,
      color: themeVariables.text
    },
    yellow: {
      backgroundColor: themeVariables.warning,
      color: themeVariables.text
    },
    blue: {
      backgroundColor: themeVariables.low,
      color: themeVariables.text
    }
  };

  // Determine base colors
  const baseColors = colorSets[type] || colorSets['default'];

  // Define hover colors (you can customize these)
  const hoverColors = {
    default: {
      backgroundColor: '#d0d0d0',
      color: '#000'
    },
    success: {
      backgroundColor: '#5cb85c', // slightly darker
      color: themeVariables.text
    },
    error: {
      backgroundColor: '#c9302c', // darker red
      color: themeVariables.text
    },
    warning: {
      backgroundColor: '#e6b91e', // darker yellow
      color: themeVariables.text
    },
    blue: {
      backgroundColor: '#006bb3', // darker blue
      color: themeVariables.text
    }
    // Add more if needed
  };

  const [hovered, setHovered] = useState(false);

  const currentColors = hovered ? hoverColors[type] || hoverColors['default'] : baseColors;

  return (
    <div
      className={styles.pill}
      style={{
        display: 'inline-block',
        backgroundColor: currentColors.backgroundColor,
        color: currentColors.color,
        border: currentColors.borderColor
          ? `1px solid ${currentColors.borderColor}`
          : `1px solid ${currentColors.backgroundColor}`,
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'all 0.2s ease' // smooth transition
      }}
      onClick={onClick}
      onMouseEnter={() => {
        onClick && setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </div>
  );
};

export default Pill;
