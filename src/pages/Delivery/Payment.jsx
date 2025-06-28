import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("online");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpay = async (orderData) => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
 // Replace with your actual Razorpay Key ID
      amount: subtotal * 100, // amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Order Payment",
      handler: async function (response) {
        try {
          await axios.post("http://localhost:8080/api/orders/submit", {
            ...orderData,
            razorpayPaymentId: response.razorpay_payment_id,
          });
          alert("Payment successful!");
          navigate("/ordersuccess");
        } catch (err) {
          alert("Payment done but order failed to submit.");
        }
      },
      prefill: {
        name: orderData.name,
        email: orderData.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePay = async () => {
    const customer = JSON.parse(localStorage.getItem("customerDetails"));
    const orderData = {
      ...customer,
      paymentMethod: method,
      totalAmount: subtotal,
    };

    if (method === "online") {
      handleRazorpay(orderData);
    } else {
      try {
        await axios.post("http://localhost:8080/api/orders/submit", orderData);
        alert("Order placed successfully!");
        navigate("/ordersuccess");
      } catch (err) {
        alert("Failed to place order.");
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Select Payment Method</h1>
      <div className="flex gap-4 mb-6">
        {["online", "cod"].map((m) => (
          <button
            key={m}
            onClick={() => setMethod(m)}
            className={`px-4 py-2 rounded border ${method === m ? "bg-indigo-600 text-white" : ""}`}
          >
            {m === "online" ? "Online Payment" : "Cash on Delivery"}
          </button>
        ))}
      </div>

      <div className="text-xl font-semibold mb-4">Total: ₹{subtotal}</div>
      <button onClick={handlePay} className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition">
        {method === "cod" ? "Place Order" : "Pay Now"}
      </button>
    </div>
  );
}
