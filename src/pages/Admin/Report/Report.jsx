// Report.jsx (React Component)
import React, { useEffect, useState } from 'react';

export default function Report() {
  const [report, setReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [editOrderId, setEditOrderId] = useState(null);
  const [editedCustomerName, setEditedCustomerName] = useState("");

  const fetchReport = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/admin/orders/sales-report?month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  };

  const fetchMonthlyReport = () => {
    fetch("http://localhost:8080/api/admin/orders/monthly-report")
      .then((res) => res.json())
      .then((data) => setMonthlyReport(data))
      .catch((err) => console.error("Error fetching monthly report:", err));
  };

  useEffect(() => {
    fetchReport();
    fetchMonthlyReport();
  }, [month]);

  const handleEdit = (order) => {
    setEditOrderId(order.id);
    setEditedCustomerName(order.customerName);
  };

  const handleSave = (orderId) => {
    fetch(`http://localhost:8080/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: editedCustomerName })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update order");
        setEditOrderId(null);
        fetchReport();
      })
      .catch((err) => alert("Failed to save changes: " + err.message));
  };

  if (loading) return <div className="text-center mt-10">Loading report...</div>;
  if (!report) return <div className="text-center mt-10 text-red-500">Failed to load report</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Monthly Sales Report</h2>

      <div className="flex justify-end mb-6">
        <label className="mr-2 font-medium">Select Month:</label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center mb-10">
        <div className="p-4 bg-green-100 rounded-lg">
          <p className="text-sm text-gray-600">Total Sales</p>
          <h3 className="text-xl font-bold text-green-700">₹ {report.totalSales.toFixed(2)}</h3>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg">
          <p className="text-sm text-gray-600">Total Orders</p>
          <h3 className="text-xl font-bold text-blue-700">{report.totalOrders}</h3>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-gray-600">Total Quantity Sold</p>
          <h3 className="text-xl font-bold text-yellow-700">{report.totalQuantitySold}</h3>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <p className="text-sm text-gray-600">Top Category</p>
          <h3 className="text-xl font-bold text-purple-700">{report.topCategory}</h3>
        </div>
        <div className="p-4 bg-pink-100 rounded-lg">
          <p className="text-sm text-gray-600">Top Product</p>
          <h3 className="text-xl font-bold text-pink-700">{report.topProduct || "N/A"}</h3>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">Total Customers</p>
          <h3 className="text-xl font-bold text-gray-700">{report.totalCustomers}</h3>
        </div>
      </div>

      <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm mb-10">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">Customer</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {report.recentOrders && report.recentOrders.map((order) => (
            <tr key={order.id}>
              <td className="border border-gray-300 px-4 py-2">{order.id}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editOrderId === order.id ? (
                  <input
                    value={editedCustomerName}
                    onChange={(e) => setEditedCustomerName(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  order.customerName
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{order.date}</td>
              <td className="border border-gray-300 px-4 py-2">₹ {order.total.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">
                {editOrderId === order.id ? (
                  <button
                    onClick={() => handleSave(order.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-lg font-semibold mb-4">Month-wise Sales Summary</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Total Orders</th>
            <th className="border px-4 py-2">Total Sales (₹)</th>
            <th className="border px-4 py-2">Quantity Sold</th>
            <th className="border px-4 py-2">Top Category</th>
            <th className="border px-4 py-2">Top Product</th>
            <th className="border px-4 py-2">Customers</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(monthlyReport) && monthlyReport.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{row.month}</td>
              <td className="border px-4 py-2">{row.totalOrders}</td>
              <td className="border px-4 py-2">₹ {row.totalSales.toFixed(2)}</td>
              <td className="border px-4 py-2">{row.totalQuantitySold}</td>
              <td className="border px-4 py-2">{row.topCategory}</td>
              <td className="border px-4 py-2">{row.topProduct}</td>
              <td className="border px-4 py-2">{row.totalCustomers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}