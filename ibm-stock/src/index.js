import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import AppRoutes from "./AppRoutes";
// import dotenv from  'dotenv'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
