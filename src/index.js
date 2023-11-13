import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from "./reportWebVitals";

// CSS
import "./core-ui/App.css";
import "./core-ui/Responsive.css";
import "./core-ui/leaflet.css";
import './routes/menu/Menu.css'
import './routes/cart/Cart.css'
import './routes/checkout/checkout.css'
import './routes/payment/payments.css'

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
