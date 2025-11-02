import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={p.image}
          alt={p.name}
          className="h-40 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{p.name}</h2>
        <p className="text-gray-500 mb-4">Rp{p.price.toLocaleString("id-ID")}</p>

        <div className="flex gap-2 justify-center">
          <Link
            to={`/product/${p.id}`}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Lihat Detail
          </Link>

          <button
            onClick={() => addToCart(p)}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}