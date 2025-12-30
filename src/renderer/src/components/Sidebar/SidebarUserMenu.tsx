import { LogOutIcon, Settings } from 'lucide-react';
import { JSX } from 'react';

import { supabase } from '@/services/supabase/client';

import styles from './SidebarUserMenu.module.scss';

export type Props = {
  onNavigate: (path: string) => void;
  onClose: () => void;
};

export default function SidebarUserMenu({ onNavigate, onClose }: Props): JSX.Element {
  const toggleTheme = (): void => {
    const isDark = document.body.classList.contains('dark');
    document.body.classList.toggle('dark', !isDark);
    document.body.classList.toggle('light', isDark);
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    onNavigate('/auth/login');
    onClose();
  };

  return (
    <div className={styles.menu}>
      <button onClick={() => (onNavigate('/settings'), onClose())}>
        <Settings /> Settings
      </button>

      <button onClick={toggleTheme}>🌙 Toggle Theme</button>

      <button className={styles.logout} onClick={logout}>
        <LogOutIcon /> Log Out
      </button>
    </div>
  );
}
