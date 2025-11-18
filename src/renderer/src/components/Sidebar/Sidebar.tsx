import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import SidebarFooter from './SidebarFooter';

type Props = {
  title?: string;
  navItems?: { label: string; to: string }[];
  showUserMenu?: boolean;
};

export default function Sidebar({
  title = 'My Workspace',
  navItems = [],
  showUserMenu = true
}: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar__logo']}>{title}</div>
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
      </nav>
      {showUserMenu && <SidebarFooter />}
    </aside>
  );
}
