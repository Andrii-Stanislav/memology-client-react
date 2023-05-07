import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN_KEY } from "../../constants/localStorage";
import { LoginData } from "../../types/auth";

import { loginReq, registerReq } from "../auth";

const useAuth = () => {
  const navigate = useNavigate();

  const isAuth = Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));

  const signIn = async (loginData: LoginData) => {
    try {
      const { data } = await loginReq(loginData);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const signUp = async (loginData: LoginData) => {
    try {
      const { data } = await registerReq(loginData);
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const signOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate("/login");
  };

  return { isAuth, signIn, signUp, signOut };
};

export default useAuth;
