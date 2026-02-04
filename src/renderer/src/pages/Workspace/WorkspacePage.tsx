import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import Card from '@/components/Card/Card';
import ProjectItem from '@/components/ProjectItem/ProjectItem';
import { TaskTableSimplified } from '@/components/Tables/TaskTableSimplified/TaskTableSimplified';
import { useProjects } from '@/queries/projects/useProjects';
import { useTasks } from '@/queries/tasks/useTasks';
import { useCurrentWorkspace } from '@/queries/workspaces/useCurrentWorkspace';
import { useWorkspaceDashboard } from '@/queries/workspaces/useWorkspaceDashboardStats';
import { ROUTES } from '@/routes/routes';
import { Project, Task } from '@/types';
import { assertDefined } from '@/utils/assertDefined';

import styles from './Workspace.module.scss';

type Props = {};

function WorkspacePage({}: Props) {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  assertDefined(workspaceId, 'workspaceId is required');

  const { data: workspace } = useCurrentWorkspace();
  const { data: workspaceDashboardStats } = useWorkspaceDashboard(workspaceId);
  const { data: upcomingTasks } = useTasks({
    upcomingDays: 14,
    workspaceId,
    page: 1,
    perPage: 10
  });
  const { data: projects } = useProjects(workspaceId);

  console.log('Workspace Dashboard Stats:', workspaceDashboardStats);
  console.log('Upcoming Tasks:', upcomingTasks);

  const handleRowClick = (task: Task, isSelected: boolean) => {
    console.log('Clicked task:', task, 'Is selected:', isSelected);
    navigate(ROUTES.WORKSPACES.TASKS.DETAILS(workspaceId, task.id));
  };

  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project);
    navigate(ROUTES.WORKSPACES.PROJECTS.DETAILS(workspaceId, project.id));
  };

  const { overdue_tasks, priority_urgent, tasks_due_today, tasks_completed_7d } =
    workspaceDashboardStats || {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 1200,
        margin: '0 auto',
        gap: '12px'
      }}
    >
      <h2>{workspace?.name || 'No workspace found'}</h2>
      <div className={styles['stats-grid']}>
        <Card>
          <div className={styles['stat-container']}>
            <div className={styles['header']}>Overdue</div>
            <div className={styles['value']}>{overdue_tasks || 0}</div>
          </div>
        </Card>
        <Card>
          <div className={styles['stat-container']}>
            <div className={styles['header']}>Urgent</div>
            <div className={styles['value']}>{priority_urgent || 0}</div>
          </div>
        </Card>
        <Card>
          <div className={styles['stat-container']}>
            <div className={styles['header']}>Due Today</div>
            <div className={styles['value']}>{tasks_due_today || 0}</div>
          </div>
        </Card>
        <Card>
          <div className={styles['stat-container']}>
            <div className={styles['header']}>Completed (7d)</div>
            <div className={styles['value']}>{tasks_completed_7d || 0}</div>
          </div>
        </Card>
      </div>
      <div className={styles['dashboard-grid']}>
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
        <Card>
          <div className={styles['card-container']}>
            <div className={styles['card-header']}>
              <div>Ongoing projects</div>
            </div>
            <div className={styles['projects-grid']}>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project)}
                  />
                ))
              ) : (
                <div>No projects found</div>
              )}
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles['card-container']}>
            <div className={styles['card-header']}>
              <div>People</div>
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
