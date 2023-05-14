import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getAllMemes } from "../../api/memes";
import useAuth from "../../api/hooks/useAuth";
import { useAppDispatch } from "../../store";
import { setAllMemes } from "../../store/memes";
import { useSocket } from "../../ws";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();
  const { socket } = useSocket();

  const { data } = useQuery({
    queryKey: ["allMemes"],
    queryFn: getAllMemes,
    enabled: isAuth,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setAllMemes(data?.data ?? []));
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (isAuth) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, [socket, isAuth]);

  return isAuth ? <Outlet /> : <Navigate to={"/login"} replace />;
};
