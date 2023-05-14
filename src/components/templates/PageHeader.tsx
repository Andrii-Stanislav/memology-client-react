import { Link } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import UserHeaderBlock from "./UserHeaderBlock";

export const PageHeader = () => {
  const { pathname } = useLocation();

  return (
    <Header component="header">
      <Navigation>
        <Link to={ROUTES.HOME}>
          <Button variant={pathname === ROUTES.HOME ? "contained" : "text"}>
            / Home
          </Button>
        </Link>
        <Link to={ROUTES.GAMES}>
          <Button variant={pathname === ROUTES.GAMES ? "contained" : "text"}>
            / Games
          </Button>
        </Link>
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
