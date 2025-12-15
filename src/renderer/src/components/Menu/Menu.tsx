import { motion, AnimatePresence } from 'framer-motion';
import { useState, JSX } from 'react';
import './Menu.css';

interface MenuItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  shortcut?: string;
}

interface MenuProps {
  items: MenuItem[];
  label: string;
}

export default function Menu({ items, label }: MenuProps): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <div className="menu-container">
      {/* Menu Button */}
      <button className="menu-button" onClick={() => setOpen((prev) => !prev)}>
        {label}
      </button>

      {/* Menu Items */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-dropdown"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {items.map((item, index) => (
              <button
                key={index}
                className={`menu-item ${item.disabled ? 'disabled' : ''}`}
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick();
                    setOpen(false);
                  }
                }}
                disabled={item.disabled}
              >
                <span>{item.label}</span>
                {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
