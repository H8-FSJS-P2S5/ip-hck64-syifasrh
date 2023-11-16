import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { CartContext } from "./context.js";

import { ThemeProvider } from "@material-tailwind/react";
import router from "./router.jsx";

function App() {
  const [cart, setCart] = useState({});
  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CartContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
