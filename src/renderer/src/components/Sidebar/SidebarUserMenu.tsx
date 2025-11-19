import styles from './SidebarUserMenu.module.scss';
import { supabase } from '@renderer/services/supabase/client';

export default function SidebarUserMenu({ onNavigate, onClose }) {
  const toggleTheme = () => {
    const isDark = document.body.classList.contains('dark');
    document.body.classList.toggle('dark', !isDark);
    document.body.classList.toggle('light', isDark);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    onNavigate('/auth/login');
    onClose();
  };

  return (
    <div className={styles.menu}>
      <button onClick={() => (onNavigate('/settings'), onClose())}>⚙️ Settings</button>

      <button onClick={toggleTheme}>🌙 Toggle Theme</button>

      <button className={styles.logout} onClick={logout}>
        🚪 Log Out
      </button>
    </div>
  );
}
