import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getGamePlayers } from '../../api/players';
import { useAppDispatch } from '../../store';
import { setCurrentGamePlayers } from '../../store/games';

const useGetPlayers = (gameId: string) => {
  const dispatch = useAppDispatch();

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getGamePlayers', gameId!],
    queryFn: ({ queryKey }) => getGamePlayers(queryKey[1]),
  });

  useEffect(() => {
    data?.data && dispatch(setCurrentGamePlayers(data?.data));
  }, [dispatch, data?.data]);

  return {
    isFetchedPlayers: isFetched,
    updatePlayers: refetch,
  };
};

export default useGetPlayers;
