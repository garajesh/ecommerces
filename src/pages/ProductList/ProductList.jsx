import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    category: "Electronics",
    brand: "SoundMaster Pro",
    image: "https://via.placeholder.com/300x300?text=Wireless+Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear audio quality.",
    features: [
      "Active Noise Cancellation",
      "Bluetooth 5.0",
      "30-hour playtime",
      "Built-in microphone",
      "Foldable design"
    ],
    colors: ["Black", "Silver", "Blue"],
    rating: 4.7,
    reviews: 128,
    inStock: true,
    warranty: "1 year manufacturer warranty",
    weight: "250g",
    dimensions: "18.5 x 17 x 7.5 cm",
    connectivity: "Bluetooth",
    batteryLife: "30 hours"
  },
  {
    id: 2,
    name: "Casual Sneakers",
    price: 1999,
    originalPrice: 2499,
    discount: 20,
    category: "Footwear",
    brand: "UrbanSteps",
    image: "https://via.placeholder.com/300x300?text=Casual+Sneakers",
    description: "Comfortable and stylish sneakers perfect for everyday wear with cushioned soles for all-day comfort.",
    features: [
      "Breathable mesh upper",
      "Cushioned insole",
      "Rubber outsole",
      "Lightweight design",
      "Available in multiple colors"
    ],
    colors: ["White", "Black", "Red"],
    rating: 4.5,
    reviews: 86,
    inStock: true,
    warranty: "6 months warranty",
    material: "Mesh and synthetic",
    soleMaterial: "Rubber",
    closure: "Lace-up",
    idealFor: "Walking, Casual wear"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    category: "Electronics",
    brand: "TechPulse",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    description: "Feature-packed smartwatch with health monitoring, GPS, and smartphone notifications.",
    features: [
      "Heart rate monitor",
      "Blood oxygen sensor",
      "Water resistant (50m)",
      "7-day battery life",
      "AMOLED display"
    ],
    colors: ["Black", "Silver"],
    rating: 4.8,
    reviews: 215,
    inStock: true,
    warranty: "2 year warranty",
    displayType: "AMOLED",
    waterResistance: "5 ATM",
    batteryLife: "7 days",
    compatibleOS: ["Android", "iOS"]
  },
  {
    id: 4,
    name: "Cotton T-shirt",
    price: 799,
    category: "Clothing",
    brand: "ComfyWear",
    image: "https://via.placeholder.com/300x300?text=Cotton+T-shirt",
    description: "100% premium cotton t-shirt with a comfortable fit and durable quality.",
    features: [
      "100% cotton",
      "Breathable fabric",
      "Reinforced stitching",
      "Multiple color options",
      "Machine washable"
    ],
    colors: ["White", "Black", "Gray", "Blue"],
    rating: 4.3,
    reviews: 42,
    inStock: true,
    material: "100% Cotton",
    fit: "Regular",
    sleeveType: "Short sleeve",
    careInstructions: "Machine wash cold, tumble dry low"
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    category: "Electronics",
    brand: "GameGear",
    image: "https://via.placeholder.com/300x300?text=Gaming+Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    features: [
      "16000 DPI sensor",
      "7 programmable buttons",
      "RGB lighting",
      "Ergonomic design",
      "Braided cable"
    ],
    colors: ["Black"],
    rating: 4.6,
    reviews: 93,
    inStock: true,
    warranty: "1 year warranty",
    sensorType: "Optical",
    connectionType: "Wired",
    programmableButtons: 7,
    lighting: "RGB"
  },
  {
    id: 6,
    name: "Formal Shoes",
    price: 2199,
    category: "Footwear",
    brand: "EliteWalk",
    image: "https://via.placeholder.com/300x300?text=Formal+Shoes",
    description: "Premium leather formal shoes for business and special occasions.",
    features: [
      "Genuine leather",
      "Cushioned insole",
      "Slip-resistant sole",
      "Classic design",
      "Available in multiple sizes"
    ],
    colors: ["Black", "Brown"],
    rating: 4.4,
    reviews: 57,
    inStock: true,
    warranty: "1 year warranty",
    material: "Genuine leather",
    soleMaterial: "Rubber",
    closure: "Lace-up",
    occasion: "Formal"
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    category: "Electronics",
    brand: "BoomAudio",
    image: "https://via.placeholder.com/300x300?text=Bluetooth+Speaker",
    description: "Portable Bluetooth speaker with 12-hour battery life and rich, powerful sound.",
    features: [
      "IPX7 waterproof",
      "12hr playtime",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Compact design"
    ],
    colors: ["Black", "Blue", "Red"],
    rating: 4.5,
    reviews: 104,
    inStock: true,
    warranty: "1 year warranty",
    batteryLife: "12 hours",
    waterResistance: "IPX7",
    connectivity: "Bluetooth 5.0",
    drivers: "Dual 10W"
  },
  {
    id: 8,
    name: "Men's Jacket",
    price: 3499,
    category: "Clothing",
    brand: "OutdoorGear",
    image: "https://via.placeholder.com/300x300?text=Men's+Jacket",
    description: "Water-resistant jacket with multiple pockets and adjustable hood.",
    features: [
      "Water-resistant fabric",
      "Multiple pockets",
      "Adjustable hood",
      "Breathable lining",
      "Available in multiple sizes"
    ],
    colors: ["Black", "Navy", "Green"],
    rating: 4.6,
    reviews: 78,
    inStock: true,
    material: "Polyester with PU coating",
    lining: "Breathable mesh",
    pockets: 4,
    hood: "Adjustable"
  },
  {
    id: 9,
    name: "Running Shoes",
    price: 2099,
    category: "Footwear",
    brand: "RunFast",
    image: "https://via.placeholder.com/300x300?text=Running+Shoes",
    description: "Lightweight running shoes with responsive cushioning for optimal performance.",
    features: [
      "Responsive cushioning",
      "Breathable upper",
      "Durable rubber outsole",
      "Arch support",
      "Shock absorption"
    ],
    colors: ["Blue/Black", "Red/White", "Black"],
    rating: 4.7,
    reviews: 132,
    inStock: true,
    warranty: "6 months warranty",
    weight: "280g (per shoe)",
    drop: "8mm",
    surface: "Road",
    technology: "Energy-return midsole"
  },
  {
    id: 10,
    name: "Wireless Keyboard",
    price: 1899,
    originalPrice: 2299,
    discount: 17,
    category: "Electronics",
    brand: "KeyTech",
    image: "https://via.placeholder.com/300x300?text=Wireless+Keyboard",
    description: "Slim wireless keyboard with quiet-touch keys and long battery life.",
    features: [
      "Wireless 2.4GHz",
      "Quiet-touch keys",
      "12-month battery life",
      "Slim design",
      "Built-in wrist rest"
    ],
    colors: ["Black", "White"],
    rating: 4.4,
    reviews: 67,
    inStock: true,
    warranty: "1 year warranty",
    connectivity: "2.4GHz wireless",
    batteryLife: "12 months",
    layout: "Full-size",
    keyType: "Scissor-switch"
  },
  {
    id: 11,
    name: "Graphic T-shirt",
    price: 699,
    category: "Clothing",
    brand: "UrbanTrend",
    image: "https://via.placeholder.com/300x300?text=Graphic+T-shirt",
    description: "Soft cotton t-shirt with unique graphic print and comfortable fit.",
    features: [
      "100% cotton",
      "Screen-printed design",
      "Pre-shrunk fabric",
      "Regular fit",
      "Machine washable"
    ],
    colors: ["White", "Black", "Gray"],
    rating: 4.2,
    reviews: 53,
    inStock: true,
    material: "100% cotton",
    fit: "Regular",
    sleeveLength: "Short",
    design: "Screen printed"
  },
  {
    id: 12,
    name: "Power Bank 10000mAh",
    price: 1499,
    originalPrice: 1799,
    discount: 17,
    category: "Electronics",
    brand: "PowerPlus",
    image: "https://via.placeholder.com/300x300?text=Power+Bank",
    description: "Compact power bank with fast charging capability for all your devices.",
    features: [
      "10000mAh capacity",
      "Dual USB ports",
      "Fast charging",
      "LED power indicator",
      "Compact design"
    ],
    colors: ["Black", "Blue"],
    rating: 4.3,
    reviews: 89,
    inStock: true,
    warranty: "1 year warranty",
    capacity: "10000mAh",
    output: "5V/2.4A",
    input: "5V/2A",
    chargingPorts: 2
  }
];

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const navigate = useNavigate();

  // Get unique brands and colors for filter options
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
      const matchesCategory = filterCategory === "All" || product.category === filterCategory;
      const matchesPrice = filterByPrice(product);
      const matchesBrand = brandFilter === "All" || product.brand === brandFilter;
      const matchesRating = filterByRating(product);
      const matchesStock = !inStockOnly || product.inStock;
      const matchesColors = filterByColors(product);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand && 
             matchesRating && matchesStock && matchesColors;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "discount":
          return (b.discount || 0) - (a.discount || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
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

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
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

        {/* Enhanced Filters Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {/* First Row - Main Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Search products, brands, descriptions..."
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

            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>

          {/* Second Row - Additional Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="All">All Brands</option>
              {uniqueBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="All">All Ratings</option>
              <option value="4.5">4.5★ & Above</option>
              <option value="4.0">4.0★ & Above</option>
              <option value="3.5">3.5★ & Above</option>
              <option value="3.0">3.0★ & Above</option>
            </select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                In Stock Only
              </label>
            </div>
          </div>

          {/* Color Filters */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors:</label>
            <div className="flex flex-wrap gap-2">
              {uniqueColors.map(color => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedColors.includes(color)
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Summary and Clear Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {filteredProducts.length} of {sampleProducts.length} products
              {activeFiltersCount > 0 && (
                <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                  {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                </span>
              )}
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                  {!product.inStock && (
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
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center mb-3">
                      <span className="text-xs text-gray-500 mr-2">Colors:</span>
                      <div className="flex space-x-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <span key={index} className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                            {color}
                          </span>
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={!product.inStock}
                    className={`w-full py-2 rounded transition-colors ${
                      product.inStock
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
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