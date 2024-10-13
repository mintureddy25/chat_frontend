import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { history, store } from "./app/services/store.jsx";
import { ConnectedRouter } from "connected-react-router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);