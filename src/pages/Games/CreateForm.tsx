import {
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import { createGame } from 'api/games';
import { ALLOWED_PLAYERS_IN_GAME } from 'constants/game';
import type { CreateGameData } from 'types/game';

const defaultValues = {
  title: '',
  playersCount: 3,
  dealsCount: 5,
  cardsOnHands: 5,
};

const prepareSubmitData = (data: CreateGameData) => ({
  title: data.title,
  playersCount: Number(data.playersCount),
  dealsCount: Number(data.dealsCount),
  cardsOnHands: Number(data.cardsOnHands),
});

type Props = {
  afterCreate: (gameId: number) => void;
};

export const CreateForm = ({ afterCreate }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateGameData>({ defaultValues });

  const onSubmit = handleSubmit(async values => {
    try {
      const { data } = await createGame(prepareSubmitData(values));
      afterCreate(data.id);
    } catch (e) {}
  });

  return (
    <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Назва гри"
            {...register('title')}
            fullWidth
            variant="outlined"
            disabled={isSubmitting}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="playersCount">Кількість гравців</InputLabel>
            <Select
              labelId="playersCount"
              label="Кількість гравців"
              {...register('playersCount')}
              defaultValue={defaultValues.playersCount}
            >
              {ALLOWED_PLAYERS_IN_GAME.map(count => (
                <MenuItem key={count} value={count}>
                  {count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Кількість роздач"
            {...register('dealsCount')}
            fullWidth
            type="number"
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Карт на руках"
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
          Створити
        </Button>
      </Box>
    </Box>
  );
};
