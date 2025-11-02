import { useState } from "react";

export default function Checkout() { 

   const cart = [
    { id: 1, name: "Baju", price: 20000, qty:2, category: "Fashion", image: "/baju.jpg" },
    { id: 2, name: "Pants", price: 20000, qty: 1, category: "Fashion", image: "/pants.jpg" },
    { id: 3, name: "Sneakers", price: 50000, qty:1, category: "Fashion", image: "/sneakers.jpg" },
    { id: 4, name: "Hat", price: 15000, qty:3, category: "Fashion", image: "/hat.jpg" },
    { id: 5, name: "Laptop", price: 500000, qty:1, category: "Elektronik", image: "/laptop.jpg" },
    { id: 6, name: "Lipstick", price: 10000, qty:2, category: "Kecantikan", image: "/lipstick.jpg" },
   ]
   
   const [nama, setNama] = useState("");
   const [alamat, setAlamat] = useState("");
   const [metode, setMetode] = useState("");

   const totalProduk = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
   const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  return ( 
    <div> 
      <h1 className="text-2xl font-bold mb-4">Checkout</h1> 
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow max-w-md">
        <form className="space-y-4"> 
          <input 
            type="text" 
            placeholder="Nama Lengkap" 
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border px-4 py-2 rounded" 
          /> 
          <input 
            type="text" 
            placeholder="Alamat Pengiriman" 
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full border px-4 py-2 rounded" 
          /> 
          <select 
             value={metode}
              onChange={(e) => setMetode(e.target.value)}
              className="w-full border px-4 py-2 rounded"
          > 
            <option value="">Metode Pembayaran</option> 
            <option>Transfer Bank</option> 
            <option>COD</option> 
          </select> 
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" 
          > 
            Konfirmasi Pesanan 
          </button> 
        </form> 
      </div> 
       
       {/* 🔹 Ringkasan Pesanan */}
        <div className="bg-white p-6 rounded shadow h-fit">
          <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>

         <div className="mb-4 text-sm text-gray-700 space-y-1">
            <p><span className="font-semibold">Nama:</span> {nama || "-"}</p>
            <p><span className="font-semibold">Alamat:</span> {alamat || "-"}</p>
            <p><span className="font-semibold">Metode Pembayaran:</span> {metode || "-"}</p>
            <p><span className="font-semibold">Jumlah Produk:</span> {totalProduk}</p>
          </div>

          <div className="divide-y">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.qty} x Rp{item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold">
                  Rp{(item.price * item.qty).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total Transaksi</span>
            <span>Rp{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
