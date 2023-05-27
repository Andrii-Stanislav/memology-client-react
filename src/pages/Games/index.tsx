import { useState } from 'react';
import { Container, Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate, generatePath } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getAllCreatedGames, getAllParticipatedGames } from 'api/games';
import { Modal } from 'components/shared';
import { ROUTES } from 'constants/routes';

import { CreateForm } from './CreateForm';
import { JoinForm } from './JoinForm';
import { GamesTable } from './GamesTable';

export const Games = () => {
  const navigate = useNavigate();

  const { data: createdGames, isFetched: isFetchedCreatedGames } = useQuery({
    queryKey: ['getAllCreatedGames'],
    queryFn: getAllCreatedGames,
  });

  const { data: participatedGames, isFetched: isFetchedParticipatedGames } =
    useQuery({
      queryKey: ['getAllParticipatedGames'],
      queryFn: getAllParticipatedGames,
    });

  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);

  const onCreateOpen = () => setOpenCreate(true);
  const onCreateClose = () => setOpenCreate(false);

  const onJoinOpen = () => setOpenJoin(true);
  const onCloseJoin = () => setOpenJoin(false);

  const afterJoinOrCreate = (gameId: number) => {
    navigate(generatePath(ROUTES.GAME_PAGE, { gameId: `${gameId}` }));
  };

  return (
    <>
      <Container component="main">
        <Stack
          direction="column"
          alignItems="center"
          pt={8}
          spacing={4}
          maxWidth="400px"
          mr="auto"
          ml="auto"
        >
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onCreateOpen}
          >
            Creacte new game
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={onJoinOpen}
          >
            Join game
          </Button>
        </Stack>

        <Box pt={4}>
          <Typography variant="h6" pb={2} align="center">
            Created games
          </Typography>
          <GamesTable
            games={createdGames?.data ?? []}
            isFetched={isFetchedCreatedGames}
          />
        </Box>

        <Box pt={4}>
          <Typography variant="h6" pb={2} align="center">
            Participated games
          </Typography>
          <GamesTable
            games={participatedGames?.data ?? []}
            isFetched={isFetchedParticipatedGames}
          />
        </Box>
      </Container>

      <Modal open={openCreate} onClose={onCreateClose}>
        <CreateForm afterCreate={afterJoinOrCreate} />
      </Modal>

      <Modal open={openJoin} onClose={onCloseJoin}>
        <Box width="300px">
          <JoinForm afterJoin={afterJoinOrCreate} />
        </Box>
      </Modal>
    </>
  );
};
