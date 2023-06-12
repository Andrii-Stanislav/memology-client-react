import { Button, Box, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { suggestSituation } from 'api/situations';
import type { SuggestSituationFormType } from 'types/situation';

const Form = {
  defaultValues: {
    text: '',
  },
};

type Props = {
  afterSubmit: () => void;
};

export const SuggestSituationForm = ({ afterSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SuggestSituationFormType>(Form);

  const onSubmit = handleSubmit(async values => {
    try {
      await suggestSituation(values);
      afterSubmit();
    } catch (e) {}
  });

  return (
    <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Ситуація"
          {...register('text')}
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
          multiline
        />

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        >
          Запропонувати
        </Button>
      </Stack>
    </Box>
  );
};
