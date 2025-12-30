import { JSX } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from '@/components/Sidebar/Sidebar';
import { useCurrentWorkspace } from '@/queries/useCurrentWorkspace';
import { ROUTES } from '@/routes/routes';

import styles from './AppLayout.module.scss';

export default function AppLayout(): JSX.Element {
  const navigate = useNavigate();
  const { data: workspace } = useCurrentWorkspace();
  const workspaceId = workspace?.id;

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
    },
    {
      title: 'Notes',
      items: [
        { label: 'Quick Notes', to: '/notes' },
        { label: 'Ideas', to: '/ideas' }
      ]
    }
  ];
  const title = workspace?.name || 'My Workspace';

  return (
    <div className={styles.layout}>
      <Sidebar groups={groups} title={title} />
      <main className={styles['layout__content']}>
        <Outlet />
      </main>
    </div>
  );
}
