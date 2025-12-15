import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

export function PrivateRoute(): JSX.Element | null {
  const { session, loading } = useAuth();

  if (loading) {
    // Optional: return a loading spinner here
    return null;
  }

  if (!session) {
    // Not logged in → redirect to login
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
