import React from 'react';
import styles from './SidebarFooter.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@renderer/hooks/useAuth';

export default function SidebarFooter() {
  const { session } = useAuth();
  const user = session?.user;
  const navigate = useNavigate();

  const avatarLetter = user?.email?.[0]?.toUpperCase() ?? '?';

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
      <button
        className={styles.settingsButton}
        onClick={() => navigate('/settings')}
        title="Settings"
      >
        ⚙️
      </button>
    </div>
  );
}
