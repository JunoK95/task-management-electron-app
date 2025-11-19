import Modal from '@renderer/components/Modal/Modal';
import styles from './SettingsLayout.module.scss';
import { useTheme } from '@renderer/hooks/useTheme';
import Sidebar from '@renderer/components/Sidebar/Sidebar';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsLayout({ open, onClose }: Props) {
  const { toggleTheme } = useTheme();

  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className={styles.container}>
        <Sidebar></Sidebar>

        <div className={styles.section}>
          <h3>Appearance</h3>
          <button onClick={toggleTheme}>Toggle Dark Mode</button>
        </div>
        <div className={styles.section}>
          <h3>Account</h3>
          <button>Sign Out</button>
        </div>
      </div>
    </Modal>
  );
}
