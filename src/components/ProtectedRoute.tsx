
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Display a loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-flex-green"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
