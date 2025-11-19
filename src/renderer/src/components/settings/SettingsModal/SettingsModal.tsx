import { useState } from 'react';
import styles from './SettingsModal.module.scss';
import { SettingsSection } from '../types';
import SettingsSidebar from '../SettingsSidebar/SettingsSidebar';

import AppearanceSection from '../sections/AppearanceSection';
import AccountSection from '../sections/AccountSection';
import NotificationsSection from '../sections/NotificationsSection';
import ShortcutsSection from '../sections/ShortcutsSection';
import AdvancedSection from '../sections/AdvancedSection';
import { useModal } from '../../../hooks/useModal';

export default function SettingsModal() {
  const { closeSettings } = useModal();
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
    <div className={styles.overlay} onClick={closeSettings}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <SettingsSidebar active={active} onSelect={setActive} />
        <div className={styles.content}>{renderSection()}</div>
      </div>
    </div>
  );
}
