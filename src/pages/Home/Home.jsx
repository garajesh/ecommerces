import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { 
    id: "electronics",
    name: "Electronics", 
    image: "/images/categories/electronics.jpg" 
  },
  { 
    id: "fashion",
    name: "Fashion", 
    image: "/images/categories/fashion.jpg" 
  },
  { 
    id: "home-kitchen",
    name: "Home & Kitchen", 
    image: "/images/categories/home.jpg" 
  },
];

const featuredProducts = [
  { 
    id: 1,
    name: "Smart Watch", 
    price: 9999,  // Removed comma, now it's a proper number
    image: "/images/products/watch.jpg",
    brand: "TechWear",
    type: "Smartwatch",
    quality: "Premium",
    features: ["Heart rate monitor", "Water resistant", "1-year warranty"],
    description: "The latest smartwatch with advanced health tracking features."
  },
  { 
    id: 2,
    name: "Headphones", 
    price: 14999,  // Removed comma
    image: "/images/products/headphones.jpg",
    brand: "AudioPro",
    type: "Wireless Headphones",
    quality: "High-end",
    features: ["Noise cancellation", "30-hour battery", "Bluetooth 5.0"],
    description: "Premium noise-cancelling headphones for immersive audio experience."
  },
  { 
    id: 3,
    name: "Sneakers", 
    price: 6499,  // Removed comma
    image: "/images/products/sneakers.jpg",
    brand: "UrbanSteps",
    type: "Running Shoes",
    quality: "Standard",
    features: ["Breathable fabric", "Cushioned soles", "Lightweight"],
    description: "Comfortable sneakers perfect for both running and casual wear."
  },
];

export default function Home() {
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already in cart
    const existingItem = existingCart.find(item => item.id === product.id);
    
    let updatedCart;
    if (existingItem) {
      updatedCart = existingCart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...existingCart, { ...product, quantity: 1 }];
    }
    
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  // Helper function to format price with Indian Rupees symbol and commas
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
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

      {/* Categories - Now clickable */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="rounded-lg overflow-hidden shadow hover:shadow-xl transition cursor-pointer"
            >
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
              <div className="p-4 text-center font-semibold text-lg">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded" 
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-indigo-600 font-bold">{formatPrice(product.price)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
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
          "Shopping here is always a breeze. Excellent service and quality products!"
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