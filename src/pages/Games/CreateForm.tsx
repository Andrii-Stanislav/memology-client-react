import { Button, Box, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { createGame } from '../../api/games';
import type { CreateGameData } from '../../types/game';

const Form = {
  defaultValues: {
    title: '',
    playersCount: 4,
    totalCardsPerUser: 20,
    cardsOnHands: 5,
  },
};

type Props = {
  afterCreate: (gameId: number) => void;
};

export const CreateForm = ({ afterCreate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateGameData>(Form);

  const onSubmit = handleSubmit(async values => {
    try {
      const { data } = await createGame(values);
      afterCreate(data.id);
    } catch (error) {
      // TODO - show error
    }
  });

  return (
    <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Game name"
            {...register('title')}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Players"
            {...register('playersCount')}
            fullWidth
            type="number"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Cards per user"
            {...register('totalCardsPerUser')}
            fullWidth
            type="number"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Cards on hands"
            {...register('cardsOnHands')}
            fullWidth
            type="number"
            variant="outlined"
            disabled
          />
        </Grid>
      </Grid>

      <Box pt={2}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};
