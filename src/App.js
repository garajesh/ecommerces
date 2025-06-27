import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Public Pages
import Home from "./pages/Home/Home";
import Products from "./pages/ProductList/ProductList";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SingleProductView from "./pages/ProductDetails/ProductDetails"; // ✅ renamed for clarity
import Cart from "./pages/Cart/Cart";
import Delivery from "./pages/Delivery/Delivery";
import Payment from "./pages/Delivery/Payment";
import OrderSuccess from "./pages/Delivery/OrderSuccess";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile/AdminProfile";
import OrderDetails from "./pages/Admin/OrderDetails/OrderDetails";
import Feedback from "./pages/Admin/Feedback/Feedback";
import Report from "./pages/Admin/Report/Report";
import AdminProductDetails from "./pages/Admin/ProductDetails/ProductDetails"; // ✅ renamed
import ProductManage from "./pages/Admin/ProductManage/ProductManage";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function AppContent() {
  const location = useLocation();
  const user = localStorage.getItem("user");
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/:id" element={<SingleProductView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin-dashboard/*"
            element={
              user === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            {/* Nested Admin Routes */}
            <Route path="profile" element={<AdminProfile />} />
            <Route path="products" element={<ProductManage />} />
            <Route path="productdetails" element={<AdminProductDetails />} />
            <Route path="orderdetails" element={<OrderDetails />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="report" element={<Report />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
