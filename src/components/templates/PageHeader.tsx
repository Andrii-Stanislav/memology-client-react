import { NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

import { UserHeaderBlock } from './UserHeaderBlock';

const ALLOWED_PATHS = ['/', '/games'];

export const PageHeader = () => {
  const { pathname } = useLocation();

  const getButtonSx = (path: string) =>
    pathname === path ? { textDecoration: 'underline' } : {};

  if (!ALLOWED_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <Header component="header">
      <Navigation>
        <NavLink to={ROUTES.HOME}>
          <Button sx={getButtonSx(ROUTES.HOME)}>/ Home</Button>
        </NavLink>
        <NavLink to={ROUTES.GAMES}>
          <Button sx={getButtonSx(ROUTES.GAMES)}>/ Games</Button>
        </NavLink>
      </Navigation>
      <UserHeaderBlock />
    </Header>
  );
};

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 16px;
`;

const Navigation = styled(Box)`
  display: flex;
  gap: 10px;
`;
