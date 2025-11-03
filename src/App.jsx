import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import Login from "./pages/Login.jsx";
import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <Routes>
      {/* 👇 Saat pertama buka '/', arahkan ke login dulu */}
      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      {/* 🔒 Halaman utama pembayaran (harus login) */}
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />

      {/* 🔒 Halaman checkout juga hanya bisa diakses kalau login */}
      <Route
        path="/checkout"
        element={user ? <Checkout /> : <Navigate to="/login" replace />}
      />

      {/* 🧑‍💻 Halaman login bebas diakses */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
