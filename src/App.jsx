import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/frontpages/Dashboard.jsx";
import ProductDetail from "./pages/frontpages/ProductDetail.jsx";
import Cart from "./pages/frontpages/Cart.jsx";
import Checkout from "./pages/frontpages/Checkout.jsx";
import AdminDashboard from "./pages/adminpages/AdminDashboard.jsx";
import AboutPage from "./pages/adminpages/AboutPage.jsx";
import ProductForm from "./pages/adminpages/ProductForm.jsx";
import EditProduct from "./pages/adminpages/EditProduct";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} />  // ✅ ini hanya untuk "/admin"
      <Route path="about" element={<AboutPage />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
      <Route path="add-product" element={<ProductForm />} />

    </Route>
  </Routes>
  );
}

export default App;