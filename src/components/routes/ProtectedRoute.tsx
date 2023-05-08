import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../api/hooks/useAuth";
import { useAppSelector, useAppDispatch } from "../../store";
import { fetchAllMemes, allMemesIsLoaded } from "../../store/memes";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const memesIsLoaded = useAppSelector(allMemesIsLoaded);

  useEffect(() => {
    if (isAuth && !memesIsLoaded) {
      dispatch(fetchAllMemes());
    }
  }, [dispatch, memesIsLoaded, isAuth]);

  return isAuth ? <Outlet /> : <Navigate to={"/login"} replace />;
};
