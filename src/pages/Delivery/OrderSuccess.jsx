import React from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for shopping with us. We’ll deliver your order soon!
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
