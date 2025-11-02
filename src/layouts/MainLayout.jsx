import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";

export default function MainLayout() {
  const [ search, setSearch ] = useState("");
  const [category, setCategory] = useState("All"); 

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header/Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

 {/* Main Section */}
      <main className="flex-1 p-6">
        <Outlet context={{ search, category }} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 E-Commerce Simple App | Version 1.0</p>
      </footer>
    </div>
  );
}
