import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { PublicRoute } from "../components/routes/PublicRoute";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";

// publicRoutes
import Login from "./Login";
import Register from "./Register";

// protectedRoutes
import HomePage from "./HomePage";
import Game from "./Game/Game";

const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: <Login />,
  },
  {
    key: "sign-up",
    path: "/sign-up",
    component: <Register />,
  },
];

const protectedRoutes = [
  {
    key: "home",
    path: "/",
    component: <HomePage />,
  },
  {
    key: "game",
    path: "/game",
    component: <Game />,
  },
];

function Pages() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          {protectedRoutes.map((route, index) => (
            <Route
              key={route.key}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/" element={<PublicRoute />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default Pages;
