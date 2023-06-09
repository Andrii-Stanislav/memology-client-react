import { forwardRef } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';
import { Button, Box, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import { joinGame } from 'api/games';
import type { JoinGameData } from 'types/game';

type CustomProps = {
  value: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const NumericFormatCustom = forwardRef<PatternFormatProps, CustomProps>(
  (props, ref) => (
    <PatternFormat getInputRef={ref} format="######" {...props} />
  ),
);

const prepareSubmitData = (data: JoinGameData) => ({
  playerName: data.playerName,
  joinCode: data.joinCode,
  gameId: Number(data.gameId),
});

type Props = {
  defaultValues?: Partial<JoinGameData>;
  disabledGameId?: boolean;
  disableJoinCode?: boolean;
  afterJoin: (gameId: number) => void;
};

export const JoinForm = ({
  defaultValues,
  disabledGameId,
  disableJoinCode,
  afterJoin,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<JoinGameData>({
    defaultValues,
  });

  const onSubmit = handleSubmit(async values => {
    try {
      const { data } = await joinGame(prepareSubmitData(values));
      afterJoin(data.gameId);
    } catch (e) {}
  });

  return (
    <Box
      p={2}
      maxWidth="300px"
      width="100%"
      component="form"
      onSubmit={onSubmit}
    >
      <Stack spacing={2} width="auto">
        <TextField
          label="ID гри"
          {...register('gameId')}
          type="number"
          fullWidth
          variant="outlined"
          disabled={disabledGameId || isSubmitting}
        />
        <StyledTextField
          label="Код приєднання до гри"
          {...register('joinCode')}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          defaultValue={defaultValues?.joinCode ?? ''}
          fullWidth
          variant="outlined"
          disabled={disableJoinCode || isSubmitting}
        />
        <TextField
          label="Нікнейм твого гравця"
          {...register('playerName')}
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        >
          Приєднатися
        </Button>
      </Stack>
    </Box>
  );
};

const StyledTextField = styled(TextField)`
  input {
    text-align: center;
  }
`;
