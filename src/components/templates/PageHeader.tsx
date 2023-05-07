import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import useAuth from "../../api/hooks/useAuth";

export const PageHeader = () => {
  const { signOut } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        padding: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </div>
      <Button onClick={signOut}>Log out</Button>
    </header>
  );
};
