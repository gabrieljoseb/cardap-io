import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
// CSS
import "./core-ui/App.css";
import "./core-ui/Responsive.css";
import './routes/menu/Menu.css'
import './routes/cart/Cart.css'
//Components
import AppWrapper from "./App.js";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
