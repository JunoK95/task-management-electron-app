import styles from './SettingsSidebar.module.scss';
import { SettingsSection } from '../types';

interface Props {
  active: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

export default function SettingsSidebar({ active, onSelect }: Props) {
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

  return (
    <div className={styles.sidebar}>
      {groups.map((group, groupIndex) => (
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

          {groupIndex < groups.length - 1 && <div className={styles.sectionDivider} />}
        </div>
      ))}
    </div>
  );
}
