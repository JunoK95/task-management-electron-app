import { useParams } from 'react-router-dom';

import { TaskForm } from '@/components/Forms/TaskForm/TaskForm';
import { useProjects } from '@/queries/useProjects';
import { useWorkspaces } from '@/queries/useWorkspaces';

function TaskDetailsPage({}) {
  const { workspaceId } = useParams<{ workspaceId: string; taskId: string }>();
  const { data: workspaces } = useWorkspaces();
  const { data: projects } = useProjects(workspaceId!);

  return (
    <div>
      <TaskForm mode="update" workspaces={workspaces} projects={projects} />
    </div>
  );
}

export default TaskDetailsPage;
