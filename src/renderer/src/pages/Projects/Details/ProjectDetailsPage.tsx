import { useParams } from 'react-router-dom';

import { useProjectDetails } from '@/queries/useProjectDetails';
import { useTasks } from '@/queries/useTasks';

type Props = {};

function ProjectDetailsPage({}: Props) {
  const { projectId = '' } = useParams();
  const { data: project } = useProjectDetails(projectId!);
  const { data: tasksData } = useTasks({ projectId: projectId! });

  const tasks = tasksData?.data || [];

  console.log(projectId, project);
  return (
    <div>
      <h1>{project?.name}</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectDetailsPage;
