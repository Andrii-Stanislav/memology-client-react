import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import { PageLayaut } from "./components/templates/PageLayaut";

import Pages from "./pages";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      contrastText: "#fff",
      // light: '',
      // dark: '',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageLayaut>
        <Pages />
      </PageLayaut>
    </ThemeProvider>
  );
}

export default App;
