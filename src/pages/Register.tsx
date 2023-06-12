import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

import { useAuth } from 'api/hooks/useAuth';
import { AurhForm } from 'components/templates/AurhForm';

export const Register = () => {
  const { signUp } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <AurhForm
        title="Реєстрація"
        buttonText="Зареєструватися"
        submitApiRequest={signUp}
        anotherFormLink={
          <Link to="/login">
            <Button size="small" sx={{ textTransform: 'none' }} fullWidth>
              перейти на логін
            </Button>
          </Link>
        }
      />
    </Container>
  );
};
