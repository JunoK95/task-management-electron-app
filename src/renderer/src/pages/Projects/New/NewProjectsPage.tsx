import { useParams } from 'react-router-dom';

import ProjectForm from '@/components/Forms/ProjectForm/ProjectForm';
import { useMyProfile } from '@/queries/useMyProfile';

type Props = {};

function NewProjectsPage({}: Props) {
  const { workspaceId } = useParams();
  const { data: user } = useMyProfile();

  return (
    <div>
      <h2>Add New Project</h2>
      <ProjectForm userId={user?.id} workspaceId={workspaceId!} />
    </div>
  );
}

export default NewProjectsPage;
