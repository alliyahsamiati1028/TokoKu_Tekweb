import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Keranjang</h1>

      {cart.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border p-3 rounded"
            >
              <span>
                {item.name} (x{item.qty})
              </span>
              <span>Rp{(Number(item.price) * item.qty).toLocaleString("id-ID")}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
