import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  MainViewContainer,
  SubViewContainer,
} from "./containers";
import { useCallback } from "react";
import { NotFound } from "./views";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import ProtectedRoutes from "./containers/ProtectedRoutes";
import React, { useEffect } from "react";
import { observer } from "mobx-react";

// useStores를 통해 data를 불러온다
import { useStores } from "./stores/Context";

const App = observer(() => {
  const { AuthStore } = useStores();

  const initializeUserInfo = useCallback(async () => {
    await AuthStore.onSilentRefresh();
    console.log(AuthStore.getUser);
  }, [AuthStore]);

  useEffect(() => {
    initializeUserInfo();

    console.log("App useEffect 호출");
  }, [initializeUserInfo, AuthStore.user.authorization]);

  console.log("App 호출");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<LoginContainer />}></Route>
          <Route path="/register" element={<RegisterContainer />}></Route>
          <Route path="/complete" element={<CompleteContainer />}></Route>
          <Route
            element={<ProtectedRoutes auth={AuthStore.user.authorization} />}
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
});
export default App;
