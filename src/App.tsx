import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PageLayaut } from './components/templates/PageLayaut';

import Pages from './pages';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      contrastText: '#fff',
      // light: '',
      // dark: '',
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageLayaut>
          <Pages />
        </PageLayaut>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
