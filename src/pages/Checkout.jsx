export default function Checkout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Pembayaran Checkout
        </h1>

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
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              Bayar dengan QRIS
            </button>
          </div>

          {/* Opsi Transfer Bank */}
          <div className="border rounded-lg p-6 hover:bg-gray-50 transition">
            <h2 className="font-medium text-gray-800 mb-3 text-lg">
              Transfer Bank
            </h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Nama Bank"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Nomor Rekening"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>
    </div>
  );
}
