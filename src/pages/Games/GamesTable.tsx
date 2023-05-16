import {
  LinearProgress,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Badge,
  Tooltip,
} from '@mui/material';
import { TagFaces, InsertPhoto } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import { getAllGames } from '../../api/games';
import { StatusBadge } from '../../components/shared';

const GamesTable = () => {
  const { data, isFetched } = useQuery({
    queryKey: ['getAllGames'],
    queryFn: getAllGames,
  });

  const onCopyJoinCode = (joinCode: string) => {
    // TODO
  };

  const onShareGame = () => {
    // TODO
  };

  return (
    <>
      <Typography variant="h6" pb={2} align="center">
        Created games
      </Typography>

      {!isFetched ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          {(data?.data ?? []).map(game => (
            <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardHeader
                  title={game.title}
                  subheader={dayjs(game.createdAt).format('H:mm, YYYY-MM-DD')}
                />
                <StyledCardContent>
                  <Badge badgeContent={game.playersCount} color="primary">
                    <Tooltip title="Players count">
                      <TagFaces color="action" />
                    </Tooltip>
                  </Badge>
                  <Badge badgeContent={game.cardsOnHands} color="primary">
                    <Tooltip title="Cards on hands">
                      <InsertPhoto color="action" />
                    </Tooltip>
                  </Badge>
                  <StatusBadge status={game.status} />
                </StyledCardContent>
                <StyledCardActions>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onCopyJoinCode.bind(null, game.joinCode)}
                  >
                    Copy join code
                  </Button>

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onShareGame.bind(null, game.joinCode)}
                  >
                    Share game
                  </Button>
                </StyledCardActions>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default GamesTable;

const StyledCard = styled(Card)`
  background-color: transparent;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: space-between;
`;
