import { JSX, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps): JSX.Element | null {
  const { session, loading } = useAuth();

  if (loading) {
    // Optional: return a loading spinner here
    return null;
  }

  if (session) {
    // Already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
