import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct, categories } = useProducts();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    img: null,
  });

  const [loading, setLoading] = useState(true);

  // 🔹 Ambil data produk berdasarkan ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setFormData({
          name: data.name || "",
          price: data.price || "",
          stock: data.stock || "",
          description: data.description || "",
          category_id: data.category_id || "",
          img: null,
        });
      } catch (error) {
      console.error("Gagal memuat produk:", error);
    } finally {
      setLoading(false); // <-- ini penting!
    }
    };
    fetchProduct();
  }, [id, getProductById]);

  // 🔹 Update setiap inputan
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // 🔹 Submit perubahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "img" && !value) return;
        if (key === "category_id") value = parseInt(value, 10);
        data.append(key, value);
      });

      await updateProduct(id, data);
      toast.success("Perubahan produk berhasil disimpan!");
      navigate("/admin"); // balik ke dashboard admin
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan perubahan produk.");
    }
  };

  if (loading) return <p className="text-center p-4">Memuat data produk...</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Produk</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nama Produk"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="price"
          type="number"
          placeholder="Harga"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stok"
          value={formData.stock}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="">Pilih Kategori</option>
          {categories?.map((cat, index) => (
            <option key={cat.id || index} value={cat.id}>
              {cat.category}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Deskripsi"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="border p-2 w-full rounded"
        />

        <input
          name="img"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
