import { useParams } from 'react-router-dom';

import ProjectForm from '@/components/Forms/ProjectForm/ProjectForm';
import { useMyProfile } from '@/queries/useMyProfile';
import { assertDefined } from '@/utils/assertDefined';

type Props = {};

function NewProjectsPage({}: Props) {
  const { workspaceId } = useParams();
  const { data: user } = useMyProfile();

  assertDefined(user?.id, 'User ID is required to create a project');

  return (
    <div>
      <h2>Add New Project</h2>
      <ProjectForm userId={user?.id} workspaceId={workspaceId!} />
    </div>
  );
}

export default NewProjectsPage;
