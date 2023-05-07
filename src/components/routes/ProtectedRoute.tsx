import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../../api/hooks/useAuth";

export const ProtectedRoute = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Outlet /> : <Navigate to={"/login"} replace />;
};
