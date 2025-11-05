import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // "Database" user sementara (contoh)
  const users = [
    { email: "admin@gmail.com", password: "123456" },
    { email: "user@gmail.com", password: "password" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Email dan password tidak boleh kosong!");
      return;
    }

    // Cek apakah email & password cocok dengan data "database"
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/home");
      window.location.reload();
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login ke Sistem Pembayaran
        </h2>

        <form onSubmit={handleLogin}>
          {error && (
            <p className="text-red-500 text-center text-sm mb-3">{error}</p>
          )}

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md mb-3"
            required
          />

          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
