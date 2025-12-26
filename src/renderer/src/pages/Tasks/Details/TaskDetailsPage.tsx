import { useParams } from 'react-router-dom';

import { useMyProfile } from '@/queries/useMyProfile';
import { useProjects } from '@/queries/useProjects';
import { useWorkspaces } from '@/queries/useWorkspaces';

import { TaskForm } from '../../../components/Forms/TaskForm/TaskForm';
import { useTaskDetails } from '../../../queries/useTaskDetails';

function TaskDetailsPage({}) {
  const { workspaceId, taskId } = useParams<{ workspaceId: string; taskId: string }>();
  const { data: workspaces } = useWorkspaces();
  const { data: projects } = useProjects(workspaceId!);
  const { data } = useTaskDetails(taskId);
  const { data: user } = useMyProfile();

  return (
    <div>
      <TaskForm
        mode="update"
        initialValues={data}
        workspaces={workspaces}
        ownerId={user?.id}
        projects={projects}
      />
    </div>
  );
}

export default TaskDetailsPage;
