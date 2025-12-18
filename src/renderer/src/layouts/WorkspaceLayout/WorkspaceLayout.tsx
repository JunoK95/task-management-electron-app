// layouts/WorkspaceLayout.tsx
import { Outlet, useParams } from 'react-router-dom';

export function WorkspaceLayout() {
  const { workspaceId } = useParams();

  if (!workspaceId) throw new Error('Missing workspaceId');

  return (
    <>
      {/* Sidebar, Header, etc */}
      <Outlet context={{ workspaceId }} />
    </>
  );
}
