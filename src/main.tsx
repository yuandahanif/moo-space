import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

import store from "@states/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <ToastContainer position="top-center" autoClose={2000} />
    </React.StrictMode>
  </Provider>
);
