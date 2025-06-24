import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sampleProducts = JSON.parse(localStorage.getItem('products')) || [];

export default function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState(urlCategory || "All");
  const [priceRange, setPriceRange] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    if (urlCategory) {
      setFilterCategory(urlCategory);
      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [urlCategory]);

  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(sampleProducts.map(product => product.brand))];
    return brands.sort();
  }, []);

  const uniqueColors = useMemo(() => {
    const colors = [...new Set(sampleProducts.flatMap(product => product.colors || []))];
    return colors.sort();
  }, []);

  const filterByPrice = (product) => {
    if (priceRange === "All") return true;
    if (priceRange === "under1000") return product.price < 1000;
    if (priceRange === "1000to2500") return product.price >= 1000 && product.price <= 2500;
    if (priceRange === "above2500") return product.price > 2500;
    return true;
  };

  const filterByRating = (product) => {
    if (ratingFilter === "All") return true;
    const minRating = parseFloat(ratingFilter);
    return product.rating >= minRating;
  };

  const filterByColors = (product) => {
    if (selectedColors.length === 0) return true;
    return selectedColors.some(color => product.colors?.includes(color));
  };

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const normalize = str => str?.toLowerCase().replace(/\s+/g, '-');
      const matchesCategory = filterCategory === "All" || normalize(product.category) === normalize(filterCategory);

      const matchesPrice = filterByPrice(product);
      const matchesBrand = brandFilter === "All" || product.brand === brandFilter;
      const matchesRating = filterByRating(product);
      const matchesStock = !inStockOnly || (product.stock > 0 || product.inStock);
      const matchesColors = filterByColors(product);

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && matchesRating && matchesStock && matchesColors;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "reviews": return b.reviews - a.reviews;
        case "discount": return (b.discount || 0) - (a.discount || 0);
        default: return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, filterCategory, priceRange, brandFilter, ratingFilter, sortBy, inStockOnly, selectedColors]);

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

  const handleColorToggle = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setFilterCategory("All");
    setPriceRange("All");
    setBrandFilter("All");
    setRatingFilter("All");
    setSortBy("name");
    setInStockOnly(false);
    setSelectedColors([]);
  };

  const activeFiltersCount = [
    searchQuery,
    filterCategory !== "All" ? filterCategory : null,
    priceRange !== "All" ? priceRange : null,
    brandFilter !== "All" ? brandFilter : null,
    ratingFilter !== "All" ? ratingFilter : null,
    inStockOnly ? "inStock" : null,
    selectedColors.length > 0 ? "colors" : null
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our <span className="text-indigo-600">Products</span>
        </h1>

        {/* Product Grid */}
        <div id="product-grid" className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                      -{product.discount}%
                    </span>
                  )}
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
