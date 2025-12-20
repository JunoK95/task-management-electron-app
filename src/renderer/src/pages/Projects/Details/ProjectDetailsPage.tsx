import { useParams } from 'react-router-dom';

import { useProjectDetails } from '@/queries/useProjectDetails';

type Props = {};

function ProjectDetailsPage({}: Props) {
  const { projectId = '' } = useParams();
  const { data: project } = useProjectDetails(projectId!);

  console.log(projectId, project);
  return <div>ProjectDetailsPage</div>;
}

export default ProjectDetailsPage;
