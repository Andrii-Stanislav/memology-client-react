import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PageLayaut } from './components/templates/PageLayaut';

import { Pages } from './pages';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
    },
  },
});

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayaut>
          <Pages />
          <ToastContainer position="top-center" hideProgressBar theme="dark" />
        </PageLayaut>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
