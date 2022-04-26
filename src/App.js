import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  MainViewContainer,
  SubViewContainer,
} from "./containers";
import React, { useCallback, useState, useEffect } from "react";
import { NotFound } from "./views";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import ProtectedRoutes from "./containers/ProtectedRoutes";

import { observer } from "mobx-react";

// useStores를 통해 data를 불러온다
import { useStores } from "./stores/Context";

import Router from "./routes";

const App = observer(() => {
  const { AuthStore } = useStores();

  const initializeUserInfo = useCallback(async () => {
    await AuthStore.onSilentRefresh();
  }, [AuthStore]);

  useEffect(() => {
    initializeUserInfo();
  }, [initializeUserInfo, AuthStore.getUser.authorization]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Router isLoggedIn={AuthStore.getUser.authorization} />
      </BrowserRouter>
    </ThemeProvider>
  );
});
export default App;
