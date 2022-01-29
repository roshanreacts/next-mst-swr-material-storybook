import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider } from "emotion-theming";
import { PersistentStoreProvider } from "../../store";
import { themeOptions } from "../../components/theme";
const theme = createTheme(themeOptions);

export const PageWrapper = ({ component }) => (
  <PersistentStoreProvider>
    <MUIThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </MUIThemeProvider>
  </PersistentStoreProvider>
);
