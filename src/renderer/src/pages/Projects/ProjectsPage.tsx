import { useNavigate, useParams } from 'react-router-dom';

import { useProjects } from '@/queries/useProjects';
import { ROUTES } from '@/routes/routes';

type Props = {};

function ProjectsPage({}: Props) {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data: projects } = useProjects(workspaceId!);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects?.map((project) => (
          <li
            key={project.id}
            onClick={() => navigate(ROUTES.WORKSPACES.PROJECTS.DETAILS(workspaceId, project.id))}
          >
            {project.name + ' - ' + project.id}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectsPage;
