import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Sample static product list — in real app, fetch from API
const sampleProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 2499,
    category: "Electronics",
    image: "https://via.placeholder.com/400x400?text=Headphones",
    description: "High-quality wireless headphones...",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 1999,
    category: "Wearables",
    image: "https://via.placeholder.com/400x400?text=Smart+Watch",
    description: "Stylish smart watch with health tracking...",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate fetching from backend
    const found = sampleProducts.find((item) => item.id === id);
    setProduct(found);
  }, [id]);

  if (!product) return <p className="p-10 text-center">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl text-indigo-600 font-semibold">₹{product.price}</p>
          <p className="text-gray-600"><strong>Category:</strong> {product.category}</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
