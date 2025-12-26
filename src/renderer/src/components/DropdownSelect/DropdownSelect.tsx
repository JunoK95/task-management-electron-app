import React, { useState, useRef, useEffect, ReactNode } from 'react';

import styles from './DropdownSelect.module.scss';

interface Option {
  label: string;
  value: string | number;
}

interface DropdownSelectProps {
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option) => void;
  renderButton?: (props: {
    isOpen: boolean;
    selected: Option | null;
    toggle: () => void;
  }) => ReactNode;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  options,
  placeholder = 'Select...',
  onChange,
  renderButton
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    if (!isOpen) {
      setShouldRender(true);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  // Remove the options from DOM after closing animation
  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const defaultButton = (
    <button
      className={styles.selectButton}
      onClick={handleToggle}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {selected ? selected.label : placeholder}
      <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
    </button>
  );

  return (
    <div className={styles.dropdown} ref={containerRef}>
      {renderButton ? renderButton({ isOpen, selected, toggle: handleToggle }) : defaultButton}
      {/* Render only if shouldRender is true */}
      {shouldRender && (
        <div
          className={`${styles.optionsContainer} ${isOpen ? styles.open : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <ul className={styles.options} role="listbox" ref={optionsRef}>
            {options.map((option) => (
              <li
                key={option.value}
                className={styles.option}
                role="option"
                aria-selected={selected?.value === option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
