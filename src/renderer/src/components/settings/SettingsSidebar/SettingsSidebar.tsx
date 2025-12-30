import clsx from 'clsx';
import { LogOut } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';

import styles from './SettingsSidebar.module.scss';
import { SettingsSection } from '../types';

interface Props {
  active: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

export default function SettingsSidebar({ active, onSelect }: Props) {
  const { signOut } = useAuth();
  const { closeSettings } = useModal();

  const groups = [
    {
      label: 'General',
      items: [
        { key: 'appearance', label: 'Appearance' },
        { key: 'account', label: 'Account' }
      ]
    },
    {
      label: 'Preferences',
      items: [
        { key: 'notifications', label: 'Notifications' },
        { key: 'shortcuts', label: 'Keyboard Shortcuts' }
      ]
    },
    {
      label: 'Advanced',
      items: [{ key: 'advanced', label: 'Advanced' }]
    }
  ];

  const handleLogout = async () => {
    await signOut();
    closeSettings();
  };

  return (
    <div className={styles.sidebar}>
      {groups.map((group) => (
        <div key={group.label} className={styles.group}>
          <h2 className={styles.groupLabel}>{group.label}</h2>
          {group.items.map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${active === item.key ? styles.active : ''}`}
              onClick={() => onSelect(item.key as SettingsSection)}
            >
              {item.label}
            </button>
          ))}
          <div className={styles.sectionDivider} />
        </div>
      ))}
      <div className={styles.group}>
        <button className={clsx([styles.navItem, styles.logout])} onClick={() => handleLogout()}>
          <LogOut size={16} />
          {'Log Out'}
        </button>
      </div>
    </div>
  );
}
