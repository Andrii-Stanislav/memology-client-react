import { forwardRef } from 'react';
import { PatternFormat, PatternFormatProps } from 'react-number-format';
import { Button, Box, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';

import { joinGame } from '../../api/games';
import type { JoinGameData } from '../../types/game';

type CustomProps = {
  value: string;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
};

const NumericFormatCustom = forwardRef<PatternFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    return <PatternFormat getInputRef={ref} format="######" {...props} />;
  },
);

type Props = {
  defaultValues?: Partial<JoinGameData>;
  disabledGameId?: boolean;
  disableJoinCode?: boolean;
  afterJoin: (gameId: number) => void;
};

const JoinForm = ({
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
      const { data } = await joinGame(values);
      afterJoin(data.gameId);
    } catch (error) {
      // TODO - show error
    }
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
          label="Game ID"
          {...register('gameId')}
          type="number"
          fullWidth
          variant="outlined"
          disabled={disabledGameId || isSubmitting}
        />
        <StyledTextField
          label="Game code"
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
          label="Player name"
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
          Join
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

export default JoinForm;
