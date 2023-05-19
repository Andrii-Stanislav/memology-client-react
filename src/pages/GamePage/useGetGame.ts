import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getGameById } from '../../api/games';
import { useAppDispatch } from '../../store';
import { setCurrentGame } from '../../store/games';

const useGetGame = (gameId: string) => {
  const dispatch = useAppDispatch();

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getGameById', gameId!],
    queryFn: ({ queryKey }) => getGameById(queryKey[1]),
  });

  useEffect(() => {
    data?.data && dispatch(setCurrentGame(data?.data));
  }, [dispatch, data?.data]);

  return { isFetchedGame: isFetched, updateGame: refetch };
};

export default useGetGame;
