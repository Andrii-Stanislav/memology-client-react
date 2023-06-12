import {
  LinearProgress,
  Typography,
  Button,
  Grid,
  Card,
  CardProps,
  CardHeader,
  CardContent,
  CardActions,
  Badge,
  Tooltip,
} from '@mui/material';
import { TagFaces, InsertPhoto, ContentCopy } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link, generatePath } from 'react-router-dom';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

import { ROUTES } from 'constants/routes';
import { StatusBadge } from 'components/shared';
import { Game, GAME_STATUS } from 'types/game';
import { useAppSelector } from 'store';
import { getUser } from 'store/user';

type Props = {
  games: Game[];
  isFetched: boolean;
};

export const GamesTable = ({ games, isFetched }: Props) => {
  const user = useAppSelector(getUser);

  const onCopyJoinCode = (joinCode: string) => {
    navigator.clipboard.writeText(joinCode);
    toast.info('Код приєднання до гри скопійовано!');
  };

  const onCopyGameLink = (gamePath: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${gamePath}`);
    toast.info('Посилання на гру скопійовано!');
  };

  if (isFetched && games?.length === 0) {
    return (
      <Typography align="center">
        Тут нічого не має ( <br />
      </Typography>
    );
  }

  return (
    <>
      {!isFetched ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          {games.map(game => {
            const gameLink = generatePath(ROUTES.GAME_PAGE, {
              gameId: `${game.id}`,
            });
            return (
              <Grid item key={game.id} xs={12} sm={6} md={4} lg={3}>
                <StyledCard gameStatus={game.status}>
                  <CardHeader
                    title={<Link to={gameLink}>{game.title}</Link>}
                    subheader={dayjs(game.createdAt).format('H:mm, YYYY-MM-DD')}
                  />
                  <StyledCardContent>
                    <Badge badgeContent={game.playersCount} color="primary">
                      <Tooltip title="Кількість гравців">
                        <TagFaces color="action" />
                      </Tooltip>
                    </Badge>
                    <Badge badgeContent={game.cardsOnHands} color="primary">
                      <Tooltip title="Карт на руках у гравця">
                        <InsertPhoto color="action" />
                      </Tooltip>
                    </Badge>
                    <StatusBadge status={game.status} />
                  </StyledCardContent>
                  <StyledCardActions>
                    <Button
                      startIcon={<ContentCopy />}
                      variant="outlined"
                      size="small"
                      onClick={onCopyJoinCode.bind(null, game.joinCode)}
                    >
                      Код гри
                    </Button>

                    <Button
                      startIcon={<ContentCopy />}
                      variant="outlined"
                      size="small"
                      onClick={onCopyGameLink.bind(null, gameLink)}
                      disabled={user?.id !== game.creatorId}
                    >
                      Посилання
                    </Button>
                  </StyledCardActions>
                </StyledCard>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

interface StyledCardProps extends CardProps {
  gameStatus: GAME_STATUS;
}

const StyledCard = styled(({ gameStatus, ...props }: StyledCardProps) => (
  <Card {...props} />
))`
  background-color: ${({ gameStatus }) => {
    switch (gameStatus) {
      case GAME_STATUS.NOT_STARTED:
        return '#fffa5aa6';
      case GAME_STATUS.STARTED:
        return '#5aff70a6';
      default:
        return 'transparent';
    }
  }};

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
