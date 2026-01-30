import { useNavigate, useParams } from 'react-router-dom';

import ProjectThumbnail from '@/components/projects/ProjectThumbnail/ProjectThumbnail';
import { useProjects } from '@/queries/projects/useProjects';
import { ROUTES } from '@/routes/routes';

import styles from './ProjectsPage.module.scss';

type Props = {};

function ProjectsPage({}: Props) {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { data: projects } = useProjects(workspaceId!);

  return (
    <div>
      <h2>Current projects</h2>
      <div className={styles['projects-grid']}>
        {projects?.map((project) => (
          <ProjectThumbnail
            key={project.id}
            project={project}
            onClick={() => navigate(ROUTES.WORKSPACES.PROJECTS.DETAILS(workspaceId, project.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
