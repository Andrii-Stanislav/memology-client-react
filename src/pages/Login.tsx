import { Link } from "react-router-dom";
import { Button } from "@mui/material";

import useAuth from "../api/hooks/useAuth";
import AurhForm from "../components/templates/AurhForm";

export default function Login() {
  const { signIn } = useAuth();

  return (
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
  );
}
