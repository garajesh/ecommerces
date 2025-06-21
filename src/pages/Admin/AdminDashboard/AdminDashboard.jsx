import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboardHome = location.pathname === "/admin-dashboard";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-bold text-indigo-600 mb-2">Admin Panel</h2>
        <p className="text-gray-600 text-sm mb-6">Welcome, Admin</p>

        <nav className="space-y-2">
          <Link to="/admin-dashboard/profile" className="block hover:text-indigo-600">👤 Profile</Link>
          <Link to="/admin-dashboard/products" className="block hover:text-indigo-600">🛍️ Product Manage</Link>
          <Link to="/admin-dashboard/product-details" className="block hover:text-indigo-600">📦 Product Details</Link>
          
          {/* ✅ Updated path to match your App.js route */}
          <Link to="/admin-dashboard/orderdetails" className="block hover:text-indigo-600">📑 Order Details</Link>

          <Link to="/admin-dashboard/feedback" className="block hover:text-indigo-600">💬 Feedback</Link>
          <Link to="/admin-dashboard/report" className="block hover:text-indigo-600">📊 Report</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white">
        {isDashboardHome ? (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-indigo-600">Welcome to the Admin Dashboard</h1>
            <p className="text-gray-700 text-lg mb-4">
              Here you can manage all aspects of the ecommerce site including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Profile:</strong> View and update your admin profile.</li>
              <li><strong>Product Manage:</strong> Add, edit, or remove products.</li>
              <li><strong>Product Details:</strong> View detailed product statistics and stock.</li>
              <li><strong>Order Details:</strong> Review customer orders and their status.</li>
              <li><strong>Feedback:</strong> See user feedback and respond accordingly.</li>
              <li><strong>Report:</strong> Analyze reports for performance and insights.</li>
            </ul>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
