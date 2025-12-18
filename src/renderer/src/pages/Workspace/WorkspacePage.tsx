import { useCurrentWorkspace } from '@/queries/useCurrentWorkspace';

type Props = {};

function WorkspacePage({}: Props) {
  const { data: workspace } = useCurrentWorkspace();

  return <div>{workspace?.name || 'No workspace found'}</div>;
}

export default WorkspacePage;
