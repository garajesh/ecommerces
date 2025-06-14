import React from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  // ✅ Default cart items (sample)
  const cartItems = [
    {
      id: 1,
      name: "Smart Watch",
      price: 129,
      image: "/images/products/watch.jpg",
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 199,
      image: "/images/products/headphones.jpg",
    },
    {
      id: 3,
      name: "Sneakers",
      price: 89,
      image: "/images/products/sneakers.jpg",
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (id) => {
    alert(`Product with ID ${id} removed (not actually implemented)`);
  };

  const handleProceed = () => {
    navigate("/delivery");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4 mb-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-indigo-600 font-bold">₹{item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Subtotal and button */}
          <div className="bg-white p-6 rounded shadow text-center">
            <p className="text-xl font-semibold mb-4">Subtotal: ₹{subtotal}</p>
            <button
              onClick={handleProceed}
              className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-500 transition"
            >
              Proceed to Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );
}
