import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AppLayout.module.scss';

export default function AppLayout() {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Tasks', to: '/tasks' }
  ];

  const title = 'My Workspace';
  return (
    <div className={styles.layout}>
      <Sidebar navItems={navItems} title={title} />
      <main className={styles['layout__content']}>
        <Outlet />
      </main>
    </div>
  );
}
