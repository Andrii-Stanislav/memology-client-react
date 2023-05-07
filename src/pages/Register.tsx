import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import useAuth from "../api/hooks/useAuth";
import AurhForm from "../components/templates/AurhForm";

export default function Register() {
  const { signUp } = useAuth();

  return (
    <AurhForm
      title="Sign up"
      buttonText="Sign up"
      submitApiRequest={signUp}
      anotherFormLink={
        <Link to="/login">
          <Button fullWidth>Sign In</Button>
        </Link>
      }
    />
  );
}
