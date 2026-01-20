import { useState } from 'react';

import styles from './SettingsModal.module.scss';
import AccountSection from '../sections/AccountSection';
import AdvancedSection from '../sections/AdvancedSection';
import AppearanceSection from '../sections/AppearanceSection';
import NotificationsSection from '../sections/NotificationsSection';
import ShortcutsSection from '../sections/ShortcutsSection';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';
import { SettingsSection } from '../types';

type Props = {
  onClose: () => void;
};

export default function SettingsModal({ onClose }: Props) {
  const [active, setActive] = useState<SettingsSection>('appearance');

  const renderSection = () => {
    switch (active) {
      case 'appearance':
        return <AppearanceSection />;
      case 'account':
        return <AccountSection />;
      case 'notifications':
        return <NotificationsSection />;
      case 'shortcuts':
        return <ShortcutsSection />;
      case 'advanced':
        return <AdvancedSection />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <SettingsSidebar active={active} onSelect={setActive} />
        <div className={styles.content}>{renderSection()}</div>
      </div>
    </div>
  );
}
