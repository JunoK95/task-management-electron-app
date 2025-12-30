import { Navigate } from 'react-router-dom';

import { useMyProfile } from '@/queries/useMyProfile';

export default function AuthGate() {
  const { data: profile, isLoading } = useMyProfile();

  if (isLoading) return null;

  if (!profile?.default_workspace) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Navigate to={`/workspaces/${profile.default_workspace}/dashboard`} replace />;
}
