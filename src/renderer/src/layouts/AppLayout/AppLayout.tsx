import { JSX } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useCurrentWorkspace } from '@/queries/useCurrentWorkspace';

import styles from './AppLayout.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';

export default function AppLayout(): JSX.Element {
  const navigate = useNavigate();
  const { data: workspace } = useCurrentWorkspace();

  const groups = [
    {
      title: 'Tasks',
      onTitleClick: () => navigate('/tasks'),
      onPlusClick: () => navigate('/tasks/new'),
      items: [
        { label: 'Overview', to: '/overview' },
        { label: 'Board', to: '/board' }
      ]
    },
    {
      title: 'Projects',
      onTitleClick: () => navigate('/projects'),
      onPlusClick: () => navigate('/projects/new'),
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
