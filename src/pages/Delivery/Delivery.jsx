import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Delivery() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (formData.name && formData.phone && formData.address && formData.pincode) {
      localStorage.setItem("customerDetails", JSON.stringify(formData));
      navigate("/payment");
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Delivery Details</h1>
      <div className="space-y-4 mb-6">
        <input name="name" placeholder="Name" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full border p-3 rounded" />
        <textarea name="address" placeholder="Address" onChange={handleChange} className="w-full border p-3 rounded" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="w-full border p-3 rounded" />
      </div>
      <button onClick={handleContinue} className="bg-indigo-600 text-white px-6 py-3 rounded">Continue to Payment</button>
    </div>
  );
}