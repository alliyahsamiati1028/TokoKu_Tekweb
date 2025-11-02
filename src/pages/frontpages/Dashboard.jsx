import { Link, useOutletContext } from "react-router-dom";

export default function Dashboard() {
  const { search, category } = useOutletContext();

  const products = [
    { id: 1, name: "Baju", price: 20000, category: "Fashion", image: "/baju.jpg" },
    { id: 2, name: "Pants", price: 20000, category: "Fashion", image: "/pants.jpg" },
    { id: 3, name: "Sneakers", price: 50000, category: "Fashion", image: "/sneakers.jpg" },
    { id: 4, name: "Hat", price: 15000, category: "Fashion", image: "/hat.jpg" },
    { id: 5, name: "Laptop", price: 500000, category: "Elektronik", image: "/laptop.jpg" },
    { id: 6, name: "Lipstick", price: 10000, category: "Kecantikan", image: "/lipstick.jpg" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || product.category === category;
    return matchSearch &&  matchCategory;
  });

   return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Produk</h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-500 mb-4">
                  Rp{product.price.toLocaleString("id-ID")}
                </p>

                <Link
                  to={`/product/${product.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center text-lg mt-20">
          Tidak ada produk ditemukan 😢
        </p>
      )}
    </div>
  );
}