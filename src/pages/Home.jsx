import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { products } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [nik, setNik] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [userData, setUserData] = useState(null);

  // Data dummy warga
  const wargaData = [
    { nik: "1234567890123456", nama: "I Made Budi", gender: "Laki-laki", status: "Tetap" },
    { nik: "9876543210987654", nama: "Ni Luh Ayu", gender: "Perempuan", status: "Pendatang" },
    { nik: "1111222233334444", nama: "I Ketut Suka", gender: "Laki-laki", status: "Tetap" },
  ];

  const handleSearch = () => {
    const warga = wargaData.find((w) => w.nik === nik);
    if (warga) {
      setUserData(warga);
      setFiltered(products);
    } else {
      setUserData(null);
      setFiltered([]);
      alert("NIK tidak ditemukan!");
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white flex flex-col p-6">
        <h1 className="text-2xl font-semibold mb-10 text-center border-b pb-4">
          Iuran Krama
        </h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/home")}
            className="text-left px-3 py-2 hover:bg-gray-800 rounded-lg"
          >
            🏠 Beranda
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="text-left px-3 py-2 hover:bg-gray-800 rounded-lg"
          >
            💳 Pembayaran
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-left px-3 py-2 hover:bg-gray-800 rounded-lg mt-auto"
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* KONTEN UTAMA */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
          Pembayaran Iuran Krama Desa
        </h1>

        {/* Input NIK */}
        <div className="flex gap-3 mb-6 justify-center">
          <input
            type="text"
            placeholder="Masukkan NIK"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Cari
          </button>
        </div>

        {/* Info Warga */}
        {userData && (
          <div className="bg-white rounded-xl shadow p-6 mb-6 text-gray-700 w-3/4 mx-auto">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Data Warga</h2>
            <p><strong>NIK:</strong> {userData.nik}</p>
            <p><strong>Nama:</strong> {userData.nama}</p>
            <p><strong>Jenis Kelamin:</strong> {userData.gender}</p>
            <p><strong>Status:</strong> {userData.status}</p>
          </div>
        )}

        {/* Daftar Tagihan */}
        {filtered.length > 0 ? (
          <table className="w-3/4 mx-auto border border-gray-200 rounded-lg bg-white">
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
          <p className="text-gray-500 text-center mt-6">
            Masukkan NIK untuk melihat tagihan.
          </p>
        )}

        {/* Keranjang */}
        {cart.length > 0 && (
          <div className="mt-10 w-3/4 mx-auto bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
              Keranjang Tagihan
            </h2>
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
                {cart.reduce((acc, cur) => acc + cur.price, 0).toLocaleString()}
              </p>
              <button
                onClick={handleCheckout}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
              >
                Lanjut ke Pembayaran
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
