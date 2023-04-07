import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

import store from "@states/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </Provider>
);
