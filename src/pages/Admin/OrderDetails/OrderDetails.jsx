import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrderDetails() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/orders/all")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders", err));
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="py-3 px-4 border">ORD{order.id.toString().padStart(6, '0')}</td>
                <td className="py-3 px-4 border">{order.name}</td>
                <td className="py-3 px-4 border">{order.phone}</td>
                <td className="py-3 px-4 border">{order.address}</td>
                <td className="py-3 px-4 border">{order.pincode}</td>
                <td className="py-3 px-4 border">{order.paymentMethod}</td>
                <td className="py-3 px-4 border">₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
