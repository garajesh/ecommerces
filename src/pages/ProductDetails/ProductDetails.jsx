import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(state?.product || null);

  useEffect(() => {
    if (!product) {
      const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
      const found = storedProducts.find(p => p.id === id);
      if (found) setProduct(found);
    }
  }, [product, id]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(item => item.id === product.id);
    const updatedCart = existingItem
      ? existingCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...existingCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  if (!product) {
    return <div className="text-center py-20 text-gray-600">Loading product details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-indigo-600 font-bold mb-4">₹{product.price}</p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">Brand</h3>
              <p>{product.brand || "—"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Category</h3>
              <p>{product.category || "—"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Rating</h3>
              <p>{product.rating ?? "—"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Reviews</h3>
              <p>{product.reviews ?? "—"}</p>
            </div>
          </div>

          {product.features?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Features</h2>
              <ul className="list-disc pl-5">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => handleAddToCart(product)}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-500 transition font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
