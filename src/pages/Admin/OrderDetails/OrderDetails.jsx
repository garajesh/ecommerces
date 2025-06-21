import React, { useEffect, useState } from "react";

export default function OrderDetails() {
  const [cartItems, setCartItems] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({});
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const customerData = JSON.parse(localStorage.getItem("customerDetails")) || {};
    const generatedOrderNumber = "ORD" + Math.floor(100000 + Math.random() * 900000);

    setCartItems(cartData);
    setCustomerDetails(customerData);
    setOrderNumber(generatedOrderNumber);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Order Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 border">Order Number</th>
              <th className="py-3 px-4 border">Customer Name</th>
              <th className="py-3 px-4 border">Phone Number</th>
              <th className="py-3 px-4 border">Address</th>
              <th className="py-3 px-4 border">Pincode</th>
              <th className="py-3 px-4 border">Total Price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-3 px-4 border">{orderNumber}</td>
              <td className="py-3 px-4 border">{customerDetails.name || "N/A"}</td>
              <td className="py-3 px-4 border">{customerDetails.phone || "N/A"}</td>
              <td className="py-3 px-4 border">{customerDetails.address || "N/A"}</td>
              <td className="py-3 px-4 border">{customerDetails.pincode || "N/A"}</td>
              <td className="py-3 px-4 border">₹{subtotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
