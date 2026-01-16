import { useCurrentWorkspace } from '@/queries/workspaces/useCurrentWorkspace';

type Props = {};

function WorkspacePage({}: Props) {
  const { data: workspace } = useCurrentWorkspace();

  return (
    <div>
      <h2>{workspace?.name || 'No workspace found'}</h2>
    </div>
  );
}

export default WorkspacePage;
