import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [isPaid, setIsPaid] = useState(false); // ✅ state untuk cek apakah sudah bayar

  // Ambil data pembayaran (sementara dari localStorage atau dummy)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("paymentData")) || {
      pembayaran_id: "PMB-001",
      tagihan_id: "TAG-001",
      tanggal_bayar: new Date().toLocaleDateString(),
      jumlah: 150000,
      status: "Pending",
      user_id: "USR-123",
    };
    setPaymentData(stored);
  }, []);

  if (!paymentData) return <p className="text-center mt-10">Memuat data pembayaran...</p>;

  const handlePayment = (method) => {
    // ✅ simulasi pembayaran berhasil
    alert(`Pembayaran berhasil menggunakan ${method}!`);
    setIsPaid(true);

    // update status di data pembayaran
    const updatedData = { ...paymentData, status: "Lunas" };
    setPaymentData(updatedData);
    localStorage.setItem("paymentData", JSON.stringify(updatedData));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
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

      {/* Konten Utama */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800">
            Pembayaran Checkout
          </h1>

          {/* Jika SUDAH BAYAR → tampilkan detail pembayaran */}
          {isPaid ? (
            <div className="bg-gray-50 border rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold mb-2 text-gray-700">Detail Pembayaran</h2>
              <p><strong>ID Pembayaran:</strong> {paymentData.pembayaran_id}</p>
              <p><strong>ID Tagihan:</strong> {paymentData.tagihan_id}</p>
              <p><strong>Tanggal Bayar:</strong> {paymentData.tanggal_bayar}</p>
              <p><strong>Jumlah:</strong> Rp {paymentData.jumlah.toLocaleString()}</p>
              <p><strong>Status:</strong> ✅ {paymentData.status}</p>
              <p><strong>User ID:</strong> {paymentData.user_id}</p>
            </div>
          ) : (
            // Jika BELUM BAYAR → tampilkan pilihan metode pembayaran
            <>
              <p className="text-gray-600 mb-6">
                Silakan pilih metode pembayaran di bawah ini:
              </p>

              <div className="space-y-6">
                {/* Opsi QRIS */}
                <div className="border rounded-lg p-6 hover:bg-gray-50 transition">
                  <h2 className="font-medium text-gray-800 mb-3 text-lg">QRIS</h2>
                  <p className="text-gray-600 mb-4">
                    Pembayaran cepat dan mudah menggunakan QRIS.
                  </p>
                  <button
                    onClick={() => handlePayment("QRIS")}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Bayar dengan QRIS
                  </button>
                </div>

                {/* Opsi Transfer Bank */}
                <div className="border rounded-lg p-6 hover:bg-gray-50 transition">
                  <h2 className="font-medium text-gray-800 mb-3 text-lg">
                    Transfer Bank
                  </h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePayment("Transfer Bank");
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Nama Bank"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nomor Rekening"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Bayar Sekarang
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
