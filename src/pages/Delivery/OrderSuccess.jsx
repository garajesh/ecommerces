import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const orderId = Math.floor(100000 + Math.random() * 900000); // mock 6-digit ID

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Payment Successful!
      </h1>

      <p className="text-lg mb-2">Thank you for shopping with us.</p>
      <p className="text-md mb-6 text-gray-600">
        Your order <strong>#{orderId}</strong> has been placed successfully.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500 transition"
      >
        Back to Home
      </button>
    </div>
  );
}
