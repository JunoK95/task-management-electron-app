import { useParams } from 'react-router-dom';

import { useProjectDashboardStats } from '@/queries/projects/useProjectDashboardStats';
import { useProjectDetails } from '@/queries/projects/useProjectDetails';
import { useTasks } from '@/queries/tasks/useTasks';
import { assertDefined } from '@/utils/assertDefined';

type Props = {};

function ProjectDetailsPage({}: Props) {
  const { projectId } = useParams();

  assertDefined(projectId, 'projectId is required');

  const { data: project } = useProjectDetails(projectId);
  const { data: tasksData } = useTasks({ projectId: projectId });
  const { data: projectDashboardStats } = useProjectDashboardStats(projectId);

  const tasks = tasksData?.data || [];

  console.log('Project Dashboard Stats:', projectDashboardStats);

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.objective}</p>
      <p>{project?.description}</p>
      {tasks.length === 0 && <p>No tasks found for this project.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetailsPage;
