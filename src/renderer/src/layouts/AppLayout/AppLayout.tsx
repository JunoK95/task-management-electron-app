// src/layouts/AppLayout/AppLayout.tsx
import { Menu } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import TaskFormModal from '@/components/Forms/TaskForm/TaskFormModal';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useModal } from '@/hooks/useModal';
import { useCurrentWorkspace } from '@/queries/useCurrentWorkspace';
import { ROUTES } from '@/routes/routes';

import styles from './AppLayout.module.scss';

export default function AppLayout(): JSX.Element {
  const navigate = useNavigate();
  const { isTaskFormOpen } = useModal();
  const { data: workspace } = useCurrentWorkspace();

  const workspaceId = workspace?.id;
  const title = workspace?.name ?? 'My Workspace';

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const groups = [
    {
      title: 'Tasks',
      onTitleClick: () => navigate(ROUTES.WORKSPACES.TASKS.ROOT(workspaceId!)),
      onPlusClick: () => navigate(ROUTES.WORKSPACES.TASKS.NEW(workspaceId!)),
      items: [
        { label: 'Overview', to: '/overview' },
        { label: 'Board', to: '/board' }
      ]
    },
    {
      title: 'Projects',
      onTitleClick: () => navigate(ROUTES.WORKSPACES.PROJECTS.ROOT(workspaceId!)),
      onPlusClick: () => navigate(ROUTES.WORKSPACES.PROJECTS.NEW(workspaceId!)),
      items: [
        { label: 'Overview', to: '/overview' },
        { label: 'Board', to: '/board' }
      ]
    }
  ];

  // Close drawer on Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      {/* Mobile header */}
      <header className={styles.mobileHeader}>
        <button
          aria-label="Open menu"
          className={styles.menuButton}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={16} />
        </button>
      </header>

      <div className={styles.layout}>
        <aside
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
          aria-hidden={!isSidebarOpen}
        >
          <Sidebar title={title} groups={groups} />
        </aside>

        {isSidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>

      {isTaskFormOpen && workspaceId && <TaskFormModal workspaceId={workspaceId} />}
    </>
  );
}
