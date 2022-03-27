import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  MainViewContainer,
  SubViewContainer,
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
      // console.log("app / access Token 값은 :", authStore.accessToken);
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
            <Route
              element={
                <ProtectedRoutes
                  authenticated={localStorage.getItem("refresh")}
                />
              }
            >
              <Route path="/main" element={<Main />}>
                <Route path=":name" element={<MainViewContainer />}>
                  <Route path=":detail" element={<SubViewContainer />} />
                </Route>
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
