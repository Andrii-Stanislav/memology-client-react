import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { useAuth } from 'api/hooks/useAuth';
import { AurhForm } from 'components/templates/AurhForm';

export const Login = () => {
  const { signIn } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <AurhForm
        title="Логін"
        buttonText="Увійти"
        submitApiRequest={signIn}
        anotherFormLink={
          <Link to="/sign-up">
            <Button size="small" sx={{ textTransform: 'none' }} fullWidth>
              перейти на реєстрацію
            </Button>
          </Link>
        }
      />
    </Container>
  );
};
