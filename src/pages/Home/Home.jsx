import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Electronics", image: "/images/categories/electronics.jpg" },
  { name: "Fashion", image: "/images/categories/fashion.jpg" },
  { name: "Home & Kitchen", image: "/images/categories/home.jpg" },
];

const featuredProducts = [
  { name: "Smart Watch", price: "$129", image: "/images/products/watch.jpg" },
  { name: "Headphones", price: "$199", image: "/images/products/headphones.jpg" },
  { name: "Sneakers", price: "$89", image: "/images/products/sneakers.jpg" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Optionally: Add to cart logic here
    navigate("/cart"); // Navigate to cart
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-24 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop the Future, Today</h1>
        <p className="text-lg md:text-xl mb-6">Discover the best products at unbeatable prices.</p>
        <a
          href="/products"
          className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Explore Products
        </a>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow hover:shadow-xl transition">
              <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center font-semibold text-lg">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-indigo-600 font-bold">{product.price}</p>
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>
        <blockquote className="italic max-w-2xl mx-auto text-gray-700">
          “Shopping here is always a breeze. Excellent service and quality products!”
        </blockquote>
        <p className="mt-4 font-semibold text-indigo-600">— Alex Johnson</p>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-600 text-white py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
        <p className="mb-6">Stay up to date with latest trends and exclusive offers</p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded text-black w-full"
          />
          <button
            type="submit"
            className="bg-white text-indigo-600 px-6 py-2 rounded hover:bg-gray-200"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
