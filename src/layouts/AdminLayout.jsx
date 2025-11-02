import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 bg-white border-r shadow-sm">
        <div className="p-4 font-bold text-lg border-b text-gray-800">
          My Admin
        </div>

        <nav className="p-4 space-y-2 text-gray-700">
          <Link
            to="/admin"
            className="block hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/about"
            className="block hover:text-blue-600 transition-colors"
          >
            About
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <Outlet /> {/* Halaman anak seperti Dashboard, ProductForm, AboutPage */}
        </div>
      </main>
    </div>
  );
}
