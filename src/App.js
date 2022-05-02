import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { observer } from "mobx-react";

// useStores를 통해 data를 불러온다
import { useStores } from "./stores/Context";

import Router from "./routes";

const App = observer(() => {
  const { AuthStore } = useStores();

  const [state, setState] = useState(null);

  const initializeUserInfo = useCallback(async () => {
    await AuthStore.onSilentRefresh();
  }, [AuthStore]);

  useEffect(() => {
    AuthStore.getPersistedAuth().then((res) =>
      setState(res.user.authorization)
    );
    initializeUserInfo();
  }, [initializeUserInfo, AuthStore]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Router isLoggedIn={state} />
      </BrowserRouter>
    </ThemeProvider>
  );
});
export default App;
