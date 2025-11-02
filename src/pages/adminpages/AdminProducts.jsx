import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/products")
      .then((res) => {
        setProducts(res.data.data || res.data);
      })
      .catch((err) => console.error("Gagal ambil produk:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading data produk...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Daftar Produk</h1>

      {products.length === 0 ? (
        <p>Tidak ada produk yang tersedia.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border text-left">Nama</th>
              <th className="p-2 border text-right">Harga</th>
              <th className="p-2 border text-center">Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id}>
                <td className="border p-2 text-center">{i + 1}</td>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2 text-right">
                  Rp {Number(p.price).toLocaleString("id-ID")}
                </td>
                <td className="border p-2 text-center">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
