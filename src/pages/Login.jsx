import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Email dan password tidak boleh kosong!");
      return;
    }

    // Simpan user ke localStorage (anggap login berhasil)
    localStorage.setItem("user", JSON.stringify({ email }));

    // Arahkan langsung ke halaman checkout
    navigate("/Home");
    window.location.reload(); // supaya App.jsx tahu user sudah login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login ke Sistem Pembayaran
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Masukkan email (bebas)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
          />
          <input
            type="password"
            placeholder="Masukkan password (bebas)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-3">
          (Gunakan email & password apa saja untuk masuk)
        </p>
      </div>
    </div>
  );
}
