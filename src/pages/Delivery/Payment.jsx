import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [bank, setBank] = useState("");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePay = async () => {
    const customer = JSON.parse(localStorage.getItem("customerDetails"));

    if (
      (method === "upi" && !upiId.trim()) ||
      (method === "card" && (!card.number || !card.name || !card.expiry || !card.cvv)) ||
      (method === "netbanking" && !bank.trim())
    ) {
      alert("Please fill all payment details.");
      return;
    }

    const orderData = {
      ...customer,
      paymentMethod: method,
      totalAmount: subtotal,
    };

    try {
      await axios.post("http://localhost:8080/api/orders/submit", orderData);
      alert("Order placed successfully!");
      navigate("/ordersuccess");
    } catch (err) {
      console.error("Order submission failed", err);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="flex gap-4 mb-6">
        {["upi", "card", "netbanking", "cash on delivery"].map((m) => (
          <button key={m} onClick={() => setMethod(m)} className={`px-4 py-2 rounded border ${method === m ? "bg-indigo-600 text-white" : ""}`}>
            {m.toUpperCase()}
          </button>
        ))}
      </div>
      {method === "upi" && <input type="text" placeholder="UPI ID" onChange={(e) => setUpiId(e.target.value)} className="w-full border p-3 rounded mb-4" />}
      {method === "card" && (
        <div className="space-y-2 mb-4">
          <input placeholder="Card Number" onChange={(e) => setCard({ ...card, number: e.target.value })} className="w-full border p-3 rounded" />
          <input placeholder="Name on Card" onChange={(e) => setCard({ ...card, name: e.target.value })} className="w-full border p-3 rounded" />
          <input placeholder="MM/YY" onChange={(e) => setCard({ ...card, expiry: e.target.value })} className="w-full border p-3 rounded" />
          <input placeholder="CVV" onChange={(e) => setCard({ ...card, cvv: e.target.value })} className="w-full border p-3 rounded" />
        </div>
      )}
      {method === "netbanking" && (
        <select onChange={(e) => setBank(e.target.value)} className="w-full border p-3 rounded mb-4">
          <option value="">Select Bank</option>
          <option value="sbi">SBI</option>
          <option value="hdfc">HDFC</option>
          <option value="icici">ICICI</option>
          <option value="axis">Axis</option>
        </select>
      )}
      <div className="text-xl font-semibold mb-4">Total: ₹{subtotal}</div>
      <button onClick={handlePay} className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition">
        {method === "cod" ? "Place Order" : "Pay Now"}
      </button>
    </div>
  );
}
