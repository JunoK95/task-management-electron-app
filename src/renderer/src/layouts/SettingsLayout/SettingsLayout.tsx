import Modal from '@renderer/components/Modal/Modal';
import styles from './SettingsLayout.module.scss';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SettingsLayout({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Settings">
      <div className={styles.section}>
        <h3>Appearance</h3>
        <button>Toggle Dark Mode</button>
      </div>
      <div className={styles.section}>
        <h3>Account</h3>
        <button>Sign Out</button>
      </div>
    </Modal>
  );
}
