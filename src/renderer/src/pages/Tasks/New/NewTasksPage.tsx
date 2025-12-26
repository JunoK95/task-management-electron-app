import { useParams } from 'react-router-dom';

import { useMyProfile } from '@/queries/useMyProfile';
import { useProjects } from '@/queries/useProjects';
import { useWorkspaces } from '@/queries/useWorkspaces';

import { TaskForm } from '../../../components/Forms/TaskForm/TaskForm';

function NewTasksPage({}) {
  const { workspaceId } = useParams();
  const { data: user } = useMyProfile();
  const { data: workspaces } = useWorkspaces();
  const { data: projects } = useProjects(workspaceId!);

  return (
    <div>
      <h2>Create new task</h2>
      <TaskForm
        mode="create"
        workspaces={workspaces}
        projects={projects}
        ownerId={user?.id}
        workspaceId={workspaceId}
      />
    </div>
  );
}

export default NewTasksPage;
