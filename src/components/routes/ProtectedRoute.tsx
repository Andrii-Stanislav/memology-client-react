import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAllMemes } from '../../api/memes';
import { useAuth } from '../../api/hooks/useAuth';
import { ACCESS_TOKEN_KEY } from '../../constants/localStorage';
import { useAppDispatch } from '../../store';
import { setAllMemes } from '../../store/memes';
import { gameSocket } from '../../ws';

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const { data } = useQuery({
    queryKey: ['allMemes'],
    queryFn: getAllMemes,
    enabled: isAuth,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setAllMemes(data?.data ?? []));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (isAuth) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      gameSocket.auth = { token };
      gameSocket.connect();
    }
    return () => {
      gameSocket.disconnect();
    };
  }, [isAuth]);

  return isAuth ? <Outlet /> : <Navigate to={'/login'} replace />;
};
