import Card from '@/components/Card/Card';
import TaskTable from '@/components/Tables/TaskTable/TaskTable';
import { useTasks } from '@/queries/tasks/useTasks';
import { useCurrentWorkspace } from '@/queries/workspaces/useCurrentWorkspace';
import { useWorkspaceDashboard } from '@/queries/workspaces/useWorkspaceDashboardStats';

type Props = {};

function WorkspacePage({}: Props) {
  const { data: workspace } = useCurrentWorkspace();
  const { data: workspaceDashboardStats } = useWorkspaceDashboard(workspace?.id);
  const { data: upcomingTasks } = useTasks({
    upcomingDays: 7,
    workspaceId: workspace?.id
  });

  console.log('Workspace Dashboard Stats:', workspaceDashboardStats);
  console.log('Upcoming Tasks:', upcomingTasks);

  return (
    <div>
      <h2>{workspace?.name || 'No workspace found'}</h2>
      <Card>
        <div>Upcoming tasks: {upcomingTasks ? upcomingTasks.data.length : 0}</div>
        <TaskTable tasks={upcomingTasks?.data || []} />
      </Card>
    </div>
  );
}

export default WorkspacePage;
