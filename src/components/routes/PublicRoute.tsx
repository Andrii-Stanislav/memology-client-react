import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../api/hooks/useAuth';

export const PublicRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};
