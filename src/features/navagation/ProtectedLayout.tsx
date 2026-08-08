import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';
import { useAuth } from '../../context/AuthContext';

export function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
