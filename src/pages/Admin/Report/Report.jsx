import React, { useEffect, useState } from 'react';

export default function Report() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/orders/sales-report")
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10">Loading report...</div>;

  if (!report) return <div className="text-center mt-10 text-red-500">Failed to load report</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sales Report</h2>

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
          <h3 className="text-xl font-bold text-pink-700">
            {report.topProduct ? report.topProduct.name : "N/A"}
          </h3>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">Total Customers</p>
          <h3 className="text-xl font-bold text-gray-700">{report.totalCustomers}</h3>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Customer</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {report.recentOrders && report.recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                <td className="border border-gray-300 px-4 py-2">{order.customerName}</td>
                <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                <td className="border border-gray-300 px-4 py-2">₹ {order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
