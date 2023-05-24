import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAllMemes } from 'api/memes';
import { getAllSituations } from 'api/situations';
import { useAuth } from 'api/hooks/useAuth';
import { ACCESS_TOKEN_KEY } from 'constants/localStorage';
import { useAppDispatch } from 'store';
import { setAllMemes } from 'store/memes';
import { setAllSituations } from 'store/situations';
import { gameSocket } from 'webSocket';

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAuth();

  const { data: memesData } = useQuery({
    queryKey: ['allMemes'],
    queryFn: getAllMemes,
    enabled: isAuth,
  });

  useEffect(() => {
    if (memesData?.data) {
      dispatch(setAllMemes(memesData?.data ?? []));
    }
  }, [dispatch, memesData]);

  const { data: situationsData } = useQuery({
    queryKey: ['getAllSituations'],
    queryFn: getAllSituations,
    enabled: isAuth,
  });

  useEffect(() => {
    if (situationsData?.data) {
      dispatch(setAllSituations(situationsData?.data ?? []));
    }
  }, [dispatch, situationsData]);

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
