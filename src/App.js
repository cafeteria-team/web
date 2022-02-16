import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Untitled,
} from "./containers";
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
          <Route path="/untitled" element={<Untitled />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
