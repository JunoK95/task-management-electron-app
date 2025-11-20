import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import SidebarFooter from './SidebarFooter';
import CollapsibleSection from './CollapsibleSection';

type NavItem = {
  label: string;
  to: string;
};

type Group = {
  title: string;
  items: NavItem[];
  onTitleClick?: () => void;
  onPlusClick?: () => void;
};

type Props = {
  title?: string;
  groups?: Group[];
  showUserMenu?: boolean;
};

export default function Sidebar({ title, groups = [], showUserMenu = true }: Props) {
  return (
    <aside className={styles.sidebar}>
      {title && <div className={styles['sidebar__logo']}>{title}</div>}
      <nav className={styles['sidebar__nav']}>
        {groups.map((group) => (
          <CollapsibleSection
            key={group.title}
            title={group.title}
            onTitleClick={group.onTitleClick}
            onPlusClick={group.onPlusClick}
          >
            {group.items.map((item) => (
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
          </CollapsibleSection>
        ))}
      </nav>

      {showUserMenu && <SidebarFooter />}
    </aside>
  );
}
