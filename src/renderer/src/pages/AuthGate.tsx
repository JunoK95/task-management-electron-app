import { Navigate } from 'react-router-dom';

import { useMyProfile } from '@/queries/useMyProfile';

export default function AuthGate() {
  const { data: profile, isLoading } = useMyProfile();

  if (isLoading) return null;

  if (!profile?.default_workspace) {
    console.log('No default workspace, redirecting to onboarding');
    return <Navigate to="/onboarding" replace />;
  }

  console.log('Redirecting to default workspace:', profile.default_workspace);
  return <Navigate to={`/workspaces/${profile.default_workspace}/dashboard`} replace />;
}
