import { Link } from "react-router-dom";

// Export Komponen dengan nama Navbar
export default function Navbar({ search, setSearch, category, setCategory}) {
  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        MyShop
      </Link>
      
       {/* 🔵 Tambahkan input & filter kategori */}
    <div className="flex items-center justify-between mt-2">
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded text-black"
        />
       <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded text-black"
        >
          <option value="All">Semua</option>
          <option value="Fashion">Fashion</option>
          <option value="Elektronik">Elektronik</option>
          <option value="Kecantikan">Kecantikan</option> 
        </select> 
      </div>

      {/* Menu Navigasi */}
      <div className="flex items-center space-x-6">
        {/* Dashboard Links */}
        <Link to="/" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/Cart" className="hover:underline">
          Keranjang
        </Link>
        <Link to="/Checkout" className="hover:underline">
          Checkout
         </Link>
      </div>
    </nav>
  );
}
