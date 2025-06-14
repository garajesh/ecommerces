import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 2499, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Headphones" },
  { id: 2, name: "Casual Sneakers", price: 1999, category: "Footwear", image: "https://via.placeholder.com/200x200?text=Sneakers" },
  { id: 3, name: "Smart Watch", price: 3999, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Watch" },
  { id: 4, name: "T-shirt - Cotton", price: 799, category: "Clothing", image: "https://via.placeholder.com/200x200?text=T-shirt" },
  { id: 5, name: "Gaming Mouse", price: 1299, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Mouse" },
  { id: 6, name: "Formal Shoes", price: 2199, category: "Footwear", image: "https://via.placeholder.com/200x200?text=Formal+Shoes" },
  { id: 7, name: "Bluetooth Speaker", price: 1599, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Speaker" },
  { id: 8, name: "Men’s Jacket", price: 3499, category: "Clothing", image: "https://via.placeholder.com/200x200?text=Jacket" },
  { id: 9, name: "Running Shoes", price: 2099, category: "Footwear", image: "https://via.placeholder.com/200x200?text=Running+Shoes" },
  { id: 10, name: "Wireless Keyboard", price: 1899, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Keyboard" },
  { id: 11, name: "Graphic T-shirt", price: 699, category: "Clothing", image: "https://via.placeholder.com/200x200?text=Graphic+Tee" },
  { id: 12, name: "Power Bank 10000mAh", price: 1499, category: "Electronics", image: "https://via.placeholder.com/200x200?text=Power+Bank" },
];

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const navigate = useNavigate();

  const filterByPrice = (product) => {
    if (priceRange === "All") return true;
    if (priceRange === "under1000") return product.price < 1000;
    if (priceRange === "1000to2500") return product.price >= 1000 && product.price <= 2500;
    if (priceRange === "above2500") return product.price > 2500;
    return true;
  };

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "All" || product.category === filterCategory;
    const matchesPrice = filterByPrice(product);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our <span className="text-indigo-600">Products</span>
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Clothing">Clothing</option>
          </select>

          <select
            className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="under1000">Under ₹1000</option>
            <option value="1000to2500">₹1000 – ₹2500</option>
            <option value="above2500">Above ₹2500</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-indigo-600 font-bold">₹{product.price}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
