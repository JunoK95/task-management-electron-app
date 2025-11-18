import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AppLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles['layout__content']}>{children}</main>
    </div>
  );
}
