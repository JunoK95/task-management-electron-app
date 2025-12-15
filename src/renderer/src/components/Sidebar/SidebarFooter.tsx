import { SettingsIcon } from 'lucide-react';
import { JSX } from 'react';

import styles from './SidebarFooter.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useModal } from '../../hooks/useModal';

export default function SidebarFooter(): JSX.Element | null {
  const { session } = useAuth();
  const { openSettings } = useModal();
  const user = session?.user;

  const avatarLetter = user?.email?.[0]?.toUpperCase() ?? '?';

  if (!user) {
    return null;
  }

  return (
    <div className={styles.footer}>
      {/* Left: User Info */}
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="User Avatar" className={styles.avatar} />
          ) : (
            <span className={styles.initial}>{avatarLetter}</span>
          )}
        </div>
        <div className={styles.details}>
          <span className={styles.name}>{user?.email ?? 'Unknown User'}</span>
          <span className={styles.role}>Signed in</span>
        </div>
      </div>

      {/* Right: Settings Icon */}
      <button className={styles.settingsButton} onClick={() => openSettings()} title="Settings">
        <SettingsIcon size={20} />
      </button>
    </div>
  );
}
