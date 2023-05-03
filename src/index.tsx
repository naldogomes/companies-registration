import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyle } from "./style/global";
import AppRouter from "./AppRouter";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastContainer autoClose={5000} theme="colored" />
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();
