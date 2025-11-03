import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔹 Bungkus semua dengan QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {/* 🔹 Tambahkan BrowserRouter di sini */}
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
