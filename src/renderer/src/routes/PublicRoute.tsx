import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PublicRoute(): JSX.Element | null {
  const { session, loading } = useAuth();

  if (loading) {
    // Optional: return a loading spinner here
    return null;
  }

  if (session) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
