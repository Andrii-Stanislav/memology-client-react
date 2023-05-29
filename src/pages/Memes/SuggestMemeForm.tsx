import { Button, Box, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { suggestMeme } from 'api/memes';
import type { SuggestMemeFormType } from 'types/meme';

const Form = {
  defaultValues: {
    title: '',
  },
};

type Props = {
  afterSubmit: () => void;
};

const prepareSubmitData = (data: SuggestMemeFormType) => ({
  title: data.title,
});

export const SuggestMemeForm = ({ afterSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SuggestMemeFormType>(Form);

  const onSubmit = handleSubmit(async values => {
    try {
      await suggestMeme(prepareSubmitData(values));
      afterSubmit();
    } catch (e) {}
  });

  return (
    <Box p={2} width="300px" component="form" onSubmit={onSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Назва мему"
          {...register('title')}
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
        />
        {/* 
              // TODO - form data logic
        */}
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
