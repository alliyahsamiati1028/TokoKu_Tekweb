import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";
import { products } from "../../utils/data.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!rating || !review.trim()) return;

    const newReview = {
      id: Date.now(),
      rating, 
      review,
    };
    setReviews([...reviews,newReview]);
    setRating(0);
    setReview("");
  };

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h1 className="text-red-500">Produk tidak ditemukan</h1>;
  }
 
  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart"); // langsung pindah ke cart
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-blue-600 text-lg font-semibold mb-4">
  Rp {product.price.toLocaleString("id-ID")}
</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to cart
      </button>

      {/* Review Section */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">User Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">Belum ada review.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border rounded-lg p-3 shadow-sm">
                <div className="flex items-center gap-1 mb-2">
                  {/* tampilkan bintang sesuai rating */}
                  {Array(r.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
                    ))}
                  {Array(5 - r.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-gray-300 text-xl">★</span>
                    ))}
                </div>
                <p className="text-gray-700">{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Form Tambah Review */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Tulis Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Rating:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full border rounded p-2"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
}

// import { useParams, Link } from "react-router-dom"; export default function ProductDetail() { const { id } = useParams(); const products = [ { id: 1, name: "Baju", price: 20, description: "Kaos nyaman dipakai sehari-hari." }, { id: 2, name: "Pants", price: 20, description: "Celana panjang bahan lembut." }, { id: 3, name: "Sneakers", price: 50, description: "Sepatu sneakers putih stylish." }, { id: 4, name: "Hat", price: 15, description: "Topi casual untuk aktivitas luar." }, { id: 5, name: "Laptop", price: 500, description: "Laptop canggih untuk produktivitas tinggi." }, { id: 6, name: "Lipstick", price: 10, description: "Lipstik warna natural untuk sehari-hari." }, ]; const product = products.find((p) => p.id === parseInt(id)); if (!product) { return <h1 className="text-red-500">Produk tidak ditemukan</h1>; } return ( <div className="max-w-md mx-auto border rounded-lg shadow p-6"> <h1 className="text-2xl font-bold mb-2">{product.name}</h1> <p className="text-gray-600 mb-2">{product.description}</p> <p className="text-lg font-semibold mb-4">${product.price}.00</p> <Link to="/cart" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" > Add to cart </Link> </div> ); }
