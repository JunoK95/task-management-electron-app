import clsx from 'clsx';
import { ChevronDown, ChevronRight, PlusCircle } from 'lucide-react';
import { JSX } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { useModal } from '@/hooks/useModal';
import { useWorkspaces } from '@/queries/workspaces/useWorkspaces';
import { ROUTES } from '@/routes/routes';

import CollapsibleSection from './CollapsibleSection';
import styles from './Sidebar.module.scss';
import SidebarFooter from './SidebarFooter';
import DropdownSelect from '../DropdownSelect/DropdownSelect';

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

export default function Sidebar({ title, groups = [], showUserMenu = true }: Props): JSX.Element {
  const { openCreateTask } = useModal();
  const { data: workspaces } = useWorkspaces();
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const options =
    workspaces?.map((workspace) => ({
      label: workspace.name,
      value: ROUTES.WORKSPACES.DASHBOARD(workspace.id)
    })) || [];

  options.push({ label: '+ Add Workspace', value: ROUTES.WORKSPACES.NEW(workspaceId) });

  const handleChange = (option: { label: string; value: string | number }) => {
    navigate(option.value.toString());
  };

  const handleQuickAddClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!workspaceId) return; // do nothing if no workspace
    openCreateTask(workspaceId);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar__header']}>
        <DropdownSelect
          options={options}
          placeholder="Select an option"
          onChange={handleChange}
          renderButton={({ isOpen, toggle }) => (
            <div className={styles['sidebar__logo']} onClick={toggle}>
              <div className={styles['sidebar__logo__text']}>{title}</div>
              <div className={styles['sidebar__logo__icon']}>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </div>
          )}
        />
      </div>
      <nav className={styles['sidebar__nav']}>
        <div
          className={clsx(styles['sidebar__item'], styles['sidebar__item--top'])}
          onClick={handleQuickAddClick}
        >
          <PlusCircle size={16} />
          Quick Add
        </div>
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
        <NavLink
          to={ROUTES.WORKSPACES.TAGS.ROOT(workspaceId)}
          className={() => clsx(styles['sidebar__item'], styles['sidebar__item--top'])}
        >
          Tags
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
