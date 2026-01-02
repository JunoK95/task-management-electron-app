import { useNavigate, useParams } from 'react-router-dom';

import ProjectForm from '@/components/Forms/ProjectForm/ProjectForm';
import { useCreateProject } from '@/queries/useCreateProject';
import { ProjectFormValues } from '@/types/domain/project';
import { assertDefined } from '@/utils/assertDefined';

type Props = {};

function NewProjectsPage({}: Props) {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  assertDefined(workspaceId, 'Workspace ID is required to create a project');

  const createProject = useCreateProject(workspaceId);

  const successCallback = () => {
    // Example: navigate back or show a toast
    navigate(-1);
    alert('Project saved successfully!');
  };
  const handleSubmit = (data: ProjectFormValues) => {
    createProject.mutate(
      { ...data, workspace_id: workspaceId },
      {
        onSuccess: successCallback
      }
    );
  };

  return (
    <div>
      <h2>Add New Project</h2>
      <ProjectForm loading={createProject.isPending} onSubmit={handleSubmit} />
    </div>
  );
}

export default NewProjectsPage;
