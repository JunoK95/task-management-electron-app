import styles from './SettingsSidebar.module.scss';
import { SettingsSection } from '../types';
import { useAuth } from '@renderer/hooks/useAuth';
import { useModal } from '@renderer/hooks/useModal';

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
    try {
      await signOut();
      closeSettings();
    } catch (error) {
      throw error;
    }
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
        <button className={`${styles.navItem}`} onClick={() => handleLogout()}>
          {'Log Out'}
        </button>
      </div>
    </div>
  );
}
