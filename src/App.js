import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
} from "./containers";
import { NotFound, Overview } from "./views";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter className="App">
        <Routes>
          <Route path="/" element={<LoginContainer />}></Route>
          <Route path="/register" element={<RegisterContainer />}></Route>
          <Route path="/complete" element={<CompleteContainer />}></Route>
          <Route path="/main" element={<Main />}>
            <Route path=":name" element={<Overview />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
