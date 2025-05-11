import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'select2/dist/js/select2.min.js';
import App from "./App.js";
import reportWebVitals from "./reportWebVitals.js";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

reportWebVitals();
