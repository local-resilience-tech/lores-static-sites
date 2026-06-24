import React from "react";
import { createRoot } from "react-dom/client";
import "@awesome.me/webawesome/dist/styles/webawesome.css";
import { App } from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
