import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  MainViewContainer,
} from "./containers";
import { NotFound } from "./views";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import ProtectedRoutes from "./containers/ProtectedRoutes";
import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

const App = inject("authStore")(
  observer(({ authStore }) => {
    const initializeUserInfo = async () => {
      await authStore.onSilentRefresh();
      if (authStore.authenticated) {
        console.log(authStore.authenticated);
        // window.location.href = "/main/overview";
      } else {
        return;
      }
    };

    useEffect(() => {
      initializeUserInfo();
    }, []);
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter className="App">
          <Routes>
            <Route path="/" element={<LoginContainer />}></Route>
            <Route path="/register" element={<RegisterContainer />}></Route>
            <Route path="/complete" element={<CompleteContainer />}></Route>
            <Route element={<ProtectedRoutes />}>
              <Route path="/main" element={<Main />}>
                <Route path=":name" element={<MainViewContainer />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  })
);

export default App;
