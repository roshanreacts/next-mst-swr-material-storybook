import { Provider } from "mobx-react";
import { useStore } from "../store";
import "../styles/globals.css";
import { getSnapshot } from "mobx-state-tree";
import { PersistentStoreProvider } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <PersistentStoreProvider>
      <Component {...pageProps} />
    </PersistentStoreProvider>
  );
}

export default MyApp;
