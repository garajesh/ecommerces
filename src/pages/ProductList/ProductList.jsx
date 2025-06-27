import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(urlCategory || "All");
  const [priceRange, setPriceRange] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filterCategory, priceRange, brandFilter, ratingFilter, sortBy, inStockOnly]);

  useEffect(() => {
    if (urlCategory) {
      setFilterCategory(urlCategory);
      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [urlCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/user-products/filter", {
        searchQuery,
        filterCategory,
        priceRange,
        brandFilter,
        ratingFilter,
        sortBy,
        inStockOnly
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find(item => item.id === product.id);
    const updatedCart = existingItem
      ? existingCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilterCategory("All");
    setPriceRange("All");
    setBrandFilter("All");
    setRatingFilter("All");
    setSortBy("name");
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our <span className="text-indigo-600">Products</span>
        </h1>

        <div id="product-grid" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {(product.stock === 0 || product.inStock === false) && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-indigo-600 font-medium">{product.category}</span>
                    <span className="text-xs text-gray-500">{product.brand}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <p className="text-indigo-600 font-bold text-lg">₹{product.price.toLocaleString()}</p>
                    {product.originalPrice && (
                      <p className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</p>
                    )}
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0 || product.inStock === false}
                    className={`w-full py-2 rounded transition-colors ${
                      product.stock > 0 && product.inStock !== false
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.stock > 0 && product.inStock !== false ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-500 mb-2">No products found</p>
              <p className="text-gray-400 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearAllFilters}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
