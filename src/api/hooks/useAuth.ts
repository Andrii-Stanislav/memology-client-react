import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ACCESS_TOKEN_KEY } from 'constants/localStorage';
import { LoginData } from 'types/auth';
import { useAppDispatch } from 'store';
import { setUser, userLoggedOut } from 'store/user';

import { loginReq, registerReq } from '../auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = Boolean(localStorage.getItem(ACCESS_TOKEN_KEY));

  const signIn = async (loginData: LoginData) => {
    try {
      const { data } = await loginReq(loginData);
      dispatch(setUser(data.user));
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
    }
  };

  const signUp = async (loginData: LoginData) => {
    try {
      const { data } = await registerReq(loginData);
      dispatch(setUser(data.user));
      localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message ?? error?.message);
    }
  };

  const signOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    dispatch(userLoggedOut());
    navigate('/login');
  };

  return { isAuth, signIn, signUp, signOut };
};
