import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import SidebarFooter from './SidebarFooter';

export default function Sidebar() {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Tasks', to: '/tasks' },
    { label: 'Settings', to: '/settings' }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar__logo']}>MyApp</div>

      <nav className={styles['sidebar__nav']}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(styles['sidebar__item'], isActive && styles['sidebar__item--active'])
            }
          >
            {item.label}
          </NavLink>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <NavLink
            key={`test-nav-${i}`}
            to={`#item${i}`}
            className={({ isActive }) => clsx(styles['sidebar__item'])}
          >
            Item {i}
          </NavLink>
        ))}
      </nav>
      <SidebarFooter />
    </aside>
  );
}
