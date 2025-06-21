import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [bank, setBank] = useState("");

  const subtotal = 129 + 199 + 89; // Example total

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePay = () => {
    const isUPI = method === "upi" && upiId.trim();
    const isCard =
      method === "card" &&
      card.number.trim() &&
      card.name.trim() &&
      card.expiry.trim() &&
      card.cvv.trim();
    const isBank = method === "netbanking" && bank.trim();
    const isCOD = method === "cod";

    if (isUPI || isCard || isBank || isCOD) {
      if (method === "cod") {
        alert("Order placed successfully! You chose Cash on Delivery.");
      } else {
        alert("Payment Successful!");
      }
      console.log("🟢 Navigating to /ordersuccess...");
      navigate("/ordersuccess");
    } else {
      alert("Please fill all required payment details.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>

      {/* Payment Method Buttons */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setMethod("upi")}
          className={`px-4 py-2 rounded border ${
            method === "upi" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          UPI
        </button>
        <button
          onClick={() => setMethod("card")}
          className={`px-4 py-2 rounded border ${
            method === "card" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          Card
        </button>
        <button
          onClick={() => setMethod("netbanking")}
          className={`px-4 py-2 rounded border ${
            method === "netbanking" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          Net Banking
        </button>
        <button
          onClick={() => setMethod("cod")}
          className={`px-4 py-2 rounded border ${
            method === "cod" ? "bg-indigo-600 text-white" : ""
          }`}
        >
          Cash on Delivery
        </button>
      </div>

      {/* Payment Form Inputs */}
      {method === "upi" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full border p-3 rounded"
          />
        </div>
      )}

      {method === "card" && (
        <div className="space-y-4 mb-4">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={card.number}
            onChange={handleCardChange}
            className="w-full border p-3 rounded"
          />
          <input
            type="text"
            name="name"
            placeholder="Name on Card"
            value={card.name}
            onChange={handleCardChange}
            className="w-full border p-3 rounded"
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={handleCardChange}
              className="w-1/2 border p-3 rounded"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={card.cvv}
              onChange={handleCardChange}
              className="w-1/2 border p-3 rounded"
            />
          </div>
        </div>
      )}

      {method === "netbanking" && (
        <div className="mb-4">
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
          </select>
        </div>
      )}

      {method === "cod" && (
        <div className="mb-4 text-left text-gray-700">
          <p>You will pay ₹{subtotal} in cash when your order is delivered.</p>
        </div>
      )}

      {/* Total and Action Button */}
      <div className="text-xl font-semibold mb-4">Total: ₹{subtotal}</div>

      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition"
      >
        {method === "cod" ? "Place Order" : "Pay Now"}
      </button>
    </div>
  );
}
