// src/pages/Home.jsx
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { products } = useProducts();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [nik, setNik] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (nik === "1234567890123456") {
      setFiltered(products);
    } else {
      setFiltered([]);
      alert("NIK tidak ditemukan!");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6 w-full max-w-5xl">
        {/* BAGIAN TAGIHAN */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Pembayaran Iuran Krama Desa
          </h1>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Masukkan NIK"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Cari Tagihan
            </button>
          </div>

          {filtered.length > 0 ? (
            <table className="w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-2 border">No</th>
                  <th className="p-2 border">Nama Iuran</th>
                  <th className="p-2 border">Jumlah (Rp)</th>
                  <th className="p-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">{index + 1}</td>
                    <td className="p-2 border">{item.name}</td>
                    <td className="p-2 border text-right">
                      {item.price.toLocaleString()}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => addToCart(item)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Tambah
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">
              Masukkan NIK untuk melihat tagihan.
            </p>
          )}
        </div>

        {/* BAGIAN CART */}
        <div className="w-1/3 bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Keranjang Tagihan
          </h2>

          {cart.length > 0 ? (
            <>
              <ul className="divide-y divide-gray-200 mb-4">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">
                        Rp {item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <p className="font-semibold text-right mb-3">
                  Total: Rp{" "}
                  {cart
                    .reduce((acc, cur) => acc + cur.price, 0)
                    .toLocaleString()}
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
                >
                  Lanjut ke Pembayaran
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Keranjang masih kosong.</p>
          )}
        </div>
      </div>
    </div>
  );
}
