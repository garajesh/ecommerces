import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categories = [
  { id: "electronics", name: "Electronics", image: "https://i.pinimg.com/originals/45/3f/15/453f15256e53bf18c80fb77021e3ccf8.png" },
  { id: "fashion", name: "Fashion", image: "https://th.bing.com/th/id/OIP.ppVkX2VcsTnBQTi41jrfCgHaEK?rs=1&pid=ImgDetMain&cb=idpwebpc2" },
  { id: "home-kitchen", name: "Home & Kitchen", image: "https://img.buzzfeed.com/buzzfeed-static/static/2019-01/3/10/asset/buzzfeed-prod-web-05/sub-buzz-16235-1546528531-1.jpg" },
];

export default function Home() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);

useEffect(() => {
  axios.get("http://localhost:8080/api/home/featured-products")
    .then((res) => {
      setFeaturedProducts(res.data);
    })
    .catch((err) => {
      console.error("Error fetching featured products:", err);
    });
}, []);




  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    const updatedCart = existingItem
      ? existingCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...existingCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
  };

  const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
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
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <div
                key={product.id}
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
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No featured products found.</p>
          )}
        </div>
      </section>
    </div>
  );
}
