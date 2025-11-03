import { createContext, useContext, useState } from "react";

// Buat context
const ProductContext = createContext();

// Provider (pembungkus global)
export function ProductProvider({ children }) {
  const [products, setProducts] = useState([
    { id: 1, name: "Iuran Kebersihan", price: 20000 },
    { id: 2, name: "Iuran Keamanan", price: 15000 },
    { id: 3, name: "Iuran Adat", price: 30000 },
  ]);

  const value = { products };
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// 🔹 Ini fungsi yang kamu butuhkan
export function useProducts() {
  return useContext(ProductContext);
}
