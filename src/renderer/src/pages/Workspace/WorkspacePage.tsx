import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/Card/Card';
import { TaskTableSimplified } from '@/components/Tables/TaskTableSimplified/TaskTableSimplified';
import { useTasks } from '@/queries/tasks/useTasks';
import { useCurrentWorkspace } from '@/queries/workspaces/useCurrentWorkspace';
import { useWorkspaceDashboard } from '@/queries/workspaces/useWorkspaceDashboardStats';
import { ROUTES } from '@/routes/routes';
import { Task } from '@/types';

import styles from './Workspace.module.scss';

type Props = {};

function WorkspacePage({}: Props) {
  const navigate = useNavigate();
  const { data: workspace } = useCurrentWorkspace();
  const { data: workspaceDashboardStats } = useWorkspaceDashboard(workspace?.id);
  const { data: upcomingTasks } = useTasks({
    upcomingDays: 14,
    workspaceId: workspace?.id,
    page: 1,
    perPage: 10
  });

  console.log('Workspace Dashboard Stats:', workspaceDashboardStats);
  console.log('Upcoming Tasks:', upcomingTasks);

  const handleRowClick = (task: Task, isSelected: boolean) => {
    console.log('Clicked task:', task, 'Is selected:', isSelected);
    navigate(ROUTES.WORKSPACES.TASKS.DETAILS(workspace!.id, task.id));
  };

  return (
    <div>
      <h2>{workspace?.name || 'No workspace found'}</h2>
      <div className={styles['dashboard-grid']}>
        <div>Graph</div>
        <Card>
          <div className={styles['card-container']}>
            <div className={styles['card-header']}>
              <div>Upcoming tasks ({upcomingTasks?.total || 0})</div>
              <div>
                <ChevronLeft size={16} />
                <ChevronRight size={16} />
              </div>
            </div>
            <TaskTableSimplified data={upcomingTasks?.data || []} onRowClick={handleRowClick} />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default WorkspacePage;
