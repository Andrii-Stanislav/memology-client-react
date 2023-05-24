import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { PublicRoute } from 'components/routes/PublicRoute';
import { ProtectedRoute } from 'components/routes/ProtectedRoute';

// publicRoutes
import { Login } from './Login';
import { Register } from './Register';

// protectedRoutes
import { Home } from './Home';
import { Memes } from './Memes';
import { Situations } from './Situations';
import { Games } from './Games';
import { GamePage } from './GamePage';

const publicRoutes = [
  {
    key: 'login',
    path: ROUTES.LOGIN,
    component: <Login />,
  },
  {
    key: 'sign-up',
    path: ROUTES.SIGN_UP,
    component: <Register />,
  },
];

const protectedRoutes = [
  {
    key: 'home',
    path: ROUTES.HOME,
    component: <Home />,
  },
  {
    key: 'memes',
    path: ROUTES.MEMES,
    component: <Memes />,
  },
  {
    key: 'situations',
    path: ROUTES.SITUATIONS,
    component: <Situations />,
  },
  {
    key: 'games',
    path: ROUTES.GAMES,
    component: <Games />,
  },
  {
    key: 'gamesPage',
    path: ROUTES.GAME_PAGE,
    component: <GamePage />,
  },
];

export const Pages = () => {
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
          {publicRoutes.map(route => (
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
};
