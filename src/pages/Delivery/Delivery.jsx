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
    console.log("Form Data:", formData);

    if (
      formData.name.trim() &&
      formData.phone.trim() &&
      formData.address.trim() &&
      formData.pincode.trim()
    ) {
      console.log("✅ All fields filled. Navigating to /payment...");
      navigate("/payment");
    } else {
      console.warn("❌ Some fields are empty.");
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Delivery Details</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <textarea
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        ></textarea>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
      </div>

      <button
        onClick={handleContinue}
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500 transition"
      >
        Continue to Payment
      </button>
    </div>
  );
}