import { Provider } from "mobx-react";
import { useStore } from "../store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../styles/globals.css";
import { getSnapshot } from "mobx-state-tree";
import { PersistentStoreProvider } from "../store";
import { themeOptions } from "../components/theme";

const theme = createTheme(themeOptions);

function MyApp({ Component, pageProps }) {
  return (
    <PersistentStoreProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </PersistentStoreProvider>
  );
}

export default MyApp;
