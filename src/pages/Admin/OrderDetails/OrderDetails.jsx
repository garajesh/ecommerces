import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/api/admin/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err));
  };

  const handleDelete = (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:8080/api/admin/orders/${orderId}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== orderId));
        alert("Order deleted successfully.");
      })
      .catch((err) => {
        console.error("Error deleting order", err);
        alert("Failed to delete order.");
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 border">Order ID</th>
              <th className="py-3 px-4 border">Customer Name</th>
              <th className="py-3 px-4 border">Phone</th>
              <th className="py-3 px-4 border">Address</th>
              <th className="py-3 px-4 border">Pincode</th>
              <th className="py-3 px-4 border">Payment Method</th>
              <th className="py-3 px-4 border">Total</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-3 px-4 border">ORD{order.id.toString().padStart(6, "0")}</td>
                <td className="py-3 px-4 border">{order.name}</td>
                <td className="py-3 px-4 border">{order.phone}</td>
                <td className="py-3 px-4 border">{order.address}</td>
                <td className="py-3 px-4 border">{order.pincode}</td>
                <td className="py-3 px-4 border">{order.paymentMethod}</td>
                <td className="py-3 px-4 border">₹{order.totalAmount}</td>
                <td className="py-3 px-4 border">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
