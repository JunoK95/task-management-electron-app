import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';
import SidebarFooter from './SidebarFooter';
import CollapsibleSection from './CollapsibleSection';
import { PlusCircle } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

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
        <NavLink
          to={'/dashboard'}
          className={({ isActive }) =>
            clsx(
              styles['sidebar__item'],
              styles['sidebar__item--top'],
              isActive && styles['sidebar__item--active']
            )
          }
        >
          <PlusCircle size={16} />
          Quick Add
        </NavLink>
        <NavLink
          to={'/dashboard'}
          className={({ isActive }) =>
            clsx(
              styles['sidebar__item'],
              styles['sidebar__item--top'],
              isActive && styles['sidebar__item--active']
            )
          }
        >
          Dashboard
        </NavLink>
        {groups.map((group, i) => (
          <Fragment key={group.title + i}>
            <CollapsibleSection
              key={group.title + i}
              title={group.title}
              onTitleClick={group.onTitleClick}
              onPlusClick={group.onPlusClick}
            >
              {group.items.map((item) => (
                <NavLink
                  key={`${group.title}-${item.to}`}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(styles['sidebar__item'], isActive && styles['sidebar__item--active'])
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </CollapsibleSection>
            {i < groups.length - 1 && (
              <div key={group.title + i + 'divider'} className={styles.divider} />
            )}
          </Fragment>
        ))}
      </nav>

      {showUserMenu && <SidebarFooter />}
    </aside>
  );
}
