import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProductList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get("category"); // Get category from URL

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [searchQuery, setSearchQuery] = useState("");
  // Initialize filterCategory based on URL, defaulting to "All" if not specified
  const [filterCategory, setFilterCategory] = useState(urlCategory || "All");
  const [priceRange, setPriceRange] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Generate dynamic filter options from actual products
  const getUniqueCategories = () => {
    const categories = [...new Set(allProducts.map(product => product.category))];
    return ["All", ...categories.sort()];
  };

  const getUniqueBrands = () => {
    const brands = [...new Set(allProducts.map(product => product.brand))];
    return ["All", ...brands.sort()];
  };

  const categories = getUniqueCategories();
  const brands = getUniqueBrands();
  const priceRanges = [
    { label: "All", value: "All" },
    { label: "Under ₹1,000", value: "0-1000" },
    { label: "₹1,000 - ₹5,000", value: "1000-5000" },
    { label: "₹5,000 - ₹10,000", value: "5000-10000" },
    { label: "₹10,000 - ₹25,000", value: "10000-25000" },
    { label: "Above ₹25,000", value: "25000+" }
  ];
  const ratingOptions = [
    { label: "All Ratings", value: "All" },
    { label: "4+ Stars", value: "4+" },
    { label: "3+ Stars", value: "3+" },
    { label: "2+ Stars", value: "2+" },
    { label: "1+ Stars", value: "1+" }
  ];
  const sortOptions = [
    { label: "Name (A-Z)", value: "name" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Category (A-Z)", value: "category-asc" },
    { label: "Category (Z-A)", value: "category-desc" },
    { label: "Price (Low to High)", value: "price-asc" },
    { label: "Price (High to Low)", value: "price-desc" },
    { label: "Rating (High to Low)", value: "rating-desc" },
    { label: "Rating (Low to High)", value: "rating-asc" },
    { label: "Newest First", value: "newest" },
    { label: "Best Selling", value: "popular" }
  ];

  // Fetch all products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Apply filters and sorting when any filter changes
  // Added urlCategory to dependencies to re-apply filters if URL category changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [allProducts, searchQuery, filterCategory, priceRange, brandFilter, ratingFilter, sortBy, inStockOnly, urlCategory]);

  // Set filterCategory from URL parameter when URL changes
  useEffect(() => {
    setFilterCategory(urlCategory || "All");
    if (urlCategory) {
      document.getElementById("product-grid")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [urlCategory]);


  const fetchAllProducts = async () => {
    try {
      // When fetching all products, don't apply any initial filters from the API call.
      // Filtering will be done client-side by `applyFiltersAndSort`.
      const response = await axios.post("http://localhost:8080/api/user-products/filter", {
        searchQuery: "",
        filterCategory: "All", // Fetch all to allow client-side filtering
        priceRange: "All",
        brandFilter: "All",
        ratingFilter: "All",
        sortBy: "name",
        inStockOnly: false
      });
      setAllProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter (now handles the initial URL category)
    if (filterCategory !== "All") {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Apply brand filter
    if (brandFilter !== "All") {
      filtered = filtered.filter(product => product.brand === brandFilter);
    }

    // Apply price range filter
    if (priceRange !== "All") {
      filtered = filtered.filter(product => {
        const price = product.price;
        switch (priceRange) {
          case "0-1000":
            return price < 1000;
          case "1000-5000":
            return price >= 1000 && price <= 5000;
          case "5000-10000":
            return price >= 5000 && price <= 10000;
          case "10000-25000":
            return price >= 10000 && price <= 25000;
          case "25000+":
            return price > 25000;
          default:
            return true;
        }
      });
    }

    // Apply rating filter
    if (ratingFilter !== "All") {
      filtered = filtered.filter(product => {
        const rating = parseFloat(product.rating);
        switch (ratingFilter) {
          case "4+":
            return rating >= 4;
          case "3+":
            return rating >= 3;
          case "2+":
            return rating >= 2;
          case "1+":
            return rating >= 1;
          default:
            return true;
        }
      });
    }

    // Apply in-stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product =>
        product.stock > 0 && product.inStock !== false
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "category-asc":
          return a.category.localeCompare(b.category);
        case "category-desc":
          return b.category.localeCompare(a.category);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return parseFloat(b.rating) - parseFloat(a.rating);
        case "rating-asc":
          return parseFloat(a.rating) - parseFloat(b.rating);
        case "newest":
          return new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0);
        case "popular":
          return (b.reviews || 0) - (a.reviews || 0);
        default:
          return 0;
      }
    });

    setProducts(filtered); // Update products with the final filtered and sorted list
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
    setFilterCategory("All"); // Reset to "All"
    setPriceRange("All");
    setBrandFilter("All");
    setRatingFilter("All");
    setSortBy("name");
    setInStockOnly(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchQuery) count++;
    if (filterCategory !== "All") count++;
    if (priceRange !== "All") count++;
    if (brandFilter !== "All") count++;
    if (ratingFilter !== "All") count++;
    if (inStockOnly) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our <span className="text-indigo-600">Products</span>
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
            Filters & Sort
            {getActiveFiltersCount() > 0 && (
              <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {ratingOptions.map(rating => (
                    <option key={rating.value} value={rating.value}>{rating.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* In Stock Only */}
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="inStockOnly"
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="inStockOnly" className="font-medium text-gray-700">
                    Show only in-stock items
                  </label>
                </div>
              </div>
            </div>

            {/* Clear Filters Button */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex justify-center">
                <button
                  onClick={clearAllFilters}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters ({getActiveFiltersCount()})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6 text-center text-gray-600">
          {products.length > 0 ? (
            <p>Showing {products.length} product{products.length !== 1 ? 's' : ''}</p>
          ) : (
            <p>No products match your criteria</p>
          )}
        </div>

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