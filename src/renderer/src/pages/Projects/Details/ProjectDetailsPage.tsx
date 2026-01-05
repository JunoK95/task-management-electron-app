import { useParams } from 'react-router-dom';

import { useProjectDetails } from '@/queries/useProjectDetails';
import { useTasks } from '@/queries/useTasks';
import { assertDefined } from '@/utils/assertDefined';

type Props = {};

function ProjectDetailsPage({}: Props) {
  const { projectId } = useParams();

  assertDefined(projectId, 'projectId is required');

  const { data: project } = useProjectDetails(projectId);
  const { data: tasksData } = useTasks({ projectId: projectId });

  const tasks = tasksData?.data || [];

  return (
    <div>
      <h1>{project?.name}</h1>
      <code>{project?.objective}</code>
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
