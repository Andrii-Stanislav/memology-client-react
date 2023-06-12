import { NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import {
  Home,
  TagFaces,
  Description,
  VideogameAsset,
} from '@mui/icons-material';

import { ROUTES } from 'constants/routes';

import { UserHeaderBlock } from './UserHeaderBlock';

export const PageHeader = () => {
  const { pathname } = useLocation();

  const getButtonSx = (path: string) =>
    pathname === path ? { textDecoration: 'underline' } : {};

  return (
    <Header component="header">
      <Navigation>
        <NavLink to={ROUTES.HOME}>
          <Button sx={getButtonSx(ROUTES.HOME)} startIcon={<Home />}>
            / Головна
          </Button>
        </NavLink>
        <NavLink to={ROUTES.MEMES}>
          <Button sx={getButtonSx(ROUTES.MEMES)} startIcon={<TagFaces />}>
            / Мемчики
          </Button>
        </NavLink>
        <NavLink to={ROUTES.SITUATIONS}>
          <Button
            sx={getButtonSx(ROUTES.SITUATIONS)}
            startIcon={<Description />}
          >
            / Текстові картки
          </Button>
        </NavLink>
        <NavLink to={ROUTES.GAMES}>
          <Button sx={getButtonSx(ROUTES.GAMES)} startIcon={<VideogameAsset />}>
            / Ігри
          </Button>
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
