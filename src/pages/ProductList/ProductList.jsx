import React, { useState } from "react";
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

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
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
                onClick={() => handleProductClick(product)}
                className="cursor-pointer bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <div className="flex items-center">
                    <p className="text-indigo-600 font-bold">₹{product.price}</p>
                    {product.originalPrice && (
                      <p className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                    )}
                    {product.discount && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                        {product.discount}% off
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    <span className="mx-1 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">{product.reviews} reviews</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                  >
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