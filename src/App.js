import React, { useCallback, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

import { observer } from "mobx-react";

// useStores를 통해 data를 불러온다
import { useStores } from "./stores/Context";

import Router from "./routes";

const App = observer(() => {
  const { AuthStore } = useStores();

  // const initializeUserInfo = useCallback(async () => {
  //   await AuthStore.onSilentRefresh();
  // }, [AuthStore]);

  // useEffect(() => {
  //   initializeUserInfo();
  // }, [initializeUserInfo, AuthStore]);

  const initializeUserInfo = () => {
    AuthStore.onSilentRefresh().then((res) => {
      // accessToken 저장
      localStorage.setItem("access", res.data.access);

      // refresh 값 쿠키로 저장
      localStorage.setItem("refresh", res.data.refresh);
    });
  };

  useEffect(() => {
    initializeUserInfo();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
});
export default App;
