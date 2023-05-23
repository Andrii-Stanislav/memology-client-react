import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { useAuth } from '../api/hooks/useAuth';
import { AurhForm } from '../components/templates/AurhForm';

export const Login = () => {
  const { signIn } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <AurhForm
        title="Sign in"
        buttonText="Sign in"
        submitApiRequest={signIn}
        anotherFormLink={
          <Link to="/sign-up">
            <Button fullWidth>Sign Up</Button>
          </Link>
        }
      />
    </Container>
  );
};
