import { useParams } from 'react-router-dom';

import { CreateTaskForm } from '@/components/Forms/TaskForm/CreateTaskForm';
import { useProjects } from '@/queries/projects/useProjects';
import { useWorkspaces } from '@/queries/workspaces/useWorkspaces';
import { assertDefined } from '@/utils/assertDefined';

function NewTasksPage({}) {
  const { workspaceId } = useParams();
  const { data: workspaces = [] } = useWorkspaces();
  const { data: projects = [] } = useProjects(workspaceId!);

  assertDefined(workspaceId, 'Workspace ID is required');

  return (
    <div>
      <h2>Create new task</h2>
      <CreateTaskForm workspaces={workspaces} projects={projects} workspaceId={workspaceId} />
    </div>
  );
}

export default NewTasksPage;
