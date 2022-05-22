import React, { useEffect, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import { observer } from "mobx-react";
// useStores를 통해 data를 불러온다
import Router from "./routes";

const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
});
export default App;
