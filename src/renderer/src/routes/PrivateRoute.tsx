import { JSX, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element | null {
  const { session, loading } = useAuth();

  if (loading) {
    // Optional: return a loading spinner here
    return null;
  }

  if (!session) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
