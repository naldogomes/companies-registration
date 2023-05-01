import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style/global";
import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
