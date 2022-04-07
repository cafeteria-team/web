import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { StoreProvider } from "./stores/Context";
import { RootStore } from "./stores/RootStore";

const rootStore = new RootStore();

ReactDOM.render(
  <CookiesProvider>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </CookiesProvider>,
  document.getElementById("root")
);
