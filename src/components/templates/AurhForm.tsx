import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';

import {
  Button,
  TextField,
  Stack,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';

import { LoginData } from '../../types/auth';
import { PasswordTextField } from '../shared';

type Props = {
  title: string;
  buttonText: string;
  submitApiRequest: (loginData: LoginData) => Promise<any>;
  anotherFormLink: ReactNode;
};

export const AurhForm = ({
  title,
  buttonText,
  submitApiRequest,
  anotherFormLink,
}: Props) => {
  const { register, handleSubmit, formState } = useForm<LoginData>();
  const { isSubmitting } = formState;

  const onSubmit = handleSubmit(submitApiRequest);

  return (
    <>
      <Stack direction="column" alignItems="center" pt={8}>
        <Typography component="h1" variant="h5">
          {title}
        </Typography>
        <Form onSubmit={onSubmit}>
          <Stack direction="column" pt={2} spacing={2}>
            <TextField
              {...register('email')}
              fullWidth
              label="Email Address"
              autoFocus
            />
            <PasswordTextField
              {...register('password')}
              fullWidth
              label="Password"
            />
          </Stack>{' '}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {buttonText}
          </Button>
          {anotherFormLink}
        </Form>
      </Stack>

      <Backdrop open={isSubmitting}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

const Form = styled('form')`
  width: 100%;
  max-width: 400px;
`;
