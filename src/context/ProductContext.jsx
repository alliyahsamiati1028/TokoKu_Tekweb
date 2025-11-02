import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

// Membuat Context Produk
const ProductContext = createContext();

// Provider untuk membungkus komponen anak agar bisa akses data produk
export const ProductProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // 🔹 GET ALL PRODUCTS
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await apiClient.get("/products");
      console.log("🔥 Respons produk:", res.data);

      const data = res.data;

      // ✅ Tangani format Laravel (data.data)
      if (data?.data && Array.isArray(data.data)) {
        return data.data;
      }

      // ✅ Kalau backend kirim langsung array
      if (Array.isArray(data)) {
        return data;
      }

      return []; // fallback jika format aneh
    },
    retry: 1, // biar gak infinite retry
  });

  // 🔹 GET ALL CATEGORIES
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get("/categories");
      const data = res.data;

      if (data?.data && Array.isArray(data.data)) {
        return data.data;
      }

      if (Array.isArray(data)) {
        return data;
      }

      return [];
    },
    staleTime: 1000 * 60 * 5, // cache 5 menit
    retry: 1,
  });

  // 🔹 SHOW PRODUCT DETAIL
  const getProductById = async (id) => {
    const res = await apiClient.get(`/products/${id}`);
    const data = res.data;
    return data?.data || data;
  };

  // 🔹 STORE PRODUCT
  const addProduct = async (formData) => {
    const response = await apiClient.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    queryClient.invalidateQueries(["products"]);
    return response.data;
  };

  // 🔹 UPDATE PRODUCT
  const updateProduct = async (id, formData) => {
    const response = await apiClient.post(
      `/products/${id}?_method=PUT`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    queryClient.invalidateQueries(["products"]);
    return response.data;
  };

  // 🔹 DELETE PRODUCT
  const deleteProduct = useMutation({
    mutationFn: async (id) => await apiClient.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["products"]),
    onError: (error) => console.error("Gagal delete produk:", error),
  });

  // 🔹 Export data & fungsi ke komponen lain
  return (
    <ProductContext.Provider
      value={{
        // Produk
        products,
        isLoading,
        isError,
        error,

        // Kategori
        categories,
        isCategoriesLoading,
        isCategoriesError,

        // Mutasi dan Fungsi
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook custom untuk menggunakan ProductContext
export const useProducts = () => useContext(ProductContext);
