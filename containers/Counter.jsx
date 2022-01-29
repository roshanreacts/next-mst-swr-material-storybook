import { inject, observer } from "mobx-react";
import MuiButton from "../components/MuiButton";
import { usePersistentStore } from "../store";
import { Box } from "@mui/material";

export default observer(function Counter(props) {
  const store = usePersistentStore();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box>
        <MuiButton onClick={store.plus} label="Add" />
        <MuiButton sx={{ mx: 2 }} onClick={store.reset} label="Reset" />
        <MuiButton onClick={store.minus} label="Subtract" />
      </Box>
      <Box>
        <MuiButton
          sx={{ my: 2 }}
          onClick={store.resetStore}
          label="Reset Store"
          color="secondary"
        />
      </Box>
    </Box>
  );
});
