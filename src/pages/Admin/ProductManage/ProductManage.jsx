import React, { useState, useEffect } from "react";

export default function ProductManage() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Sample initial products data
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 99.99,
        stock: 25,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop&crop=center",
        status: "active"
      },
      {
        id: 2,
        name: "Running Shoes",
        category: "Sports",
        price: 79.99,
        stock: 15,
        description: "Comfortable running shoes for daily exercise",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop&crop=center",
        status: "active"
      },
      {
        id: 3,
        name: "Coffee Maker",
        category: "Home",
        price: 149.99,
        stock: 8,
        description: "Automatic drip coffee maker with timer",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop&crop=center",
        status: "inactive"
      },
      {
        id: 4,
        name: "Smartphone Case",
        category: "Electronics",
        price: 24.99,
        stock: 50,
        description: "Protective case for smartphones with drop protection",
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop&crop=center",
        status: "active"
      },
      {
        id: 5,
        name: "Yoga Mat",
        category: "Sports",
        price: 35.99,
        stock: 5,
        description: "Non-slip yoga mat for fitness and meditation",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&crop=center",
        status: "active"
      },
      {
        id: 6,
        name: "LED Desk Lamp",
        category: "Home",
        price: 45.99,
        stock: 12,
        description: "Adjustable LED desk lamp with USB charging port",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
        status: "active"
      }
    ];
    setProducts(sampleProducts);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    status: "active"
  });

  const categories = ["Electronics", "Sports", "Home", "Fashion", "Books", "Beauty"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
          : product
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };
      setProducts(prev => [...prev, newProduct]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      status: "active"
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
      image: product.image,
      status: product.status
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setProducts(prev => prev.map(product =>
      product.id === id
        ? { ...product, status: product.status === "active" ? "inactive" : "active" }
        : product
    ));
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">Product Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add New Product
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="md:w-48">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No products found. {searchTerm && "Try adjusting your search terms."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image || "https://via.placeholder.com/50x50?text=No+Image"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover mr-4 shadow-sm"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`${product.stock < 10 ? 'text-red-600 font-semibold' : 'font-medium'}`}>
                        {product.stock}
                      </span>
                      {product.stock < 10 && (
                        <span className="text-xs text-red-500 block font-medium">⚠️ Low Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(product.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        {product.status === 'active' ? '✓ Active' : '✗ Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors font-medium"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 transition-colors font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-500">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
          <p className="text-3xl font-bold text-indigo-600">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Active Products</h3>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Low Stock Items</h3>
          <p className="text-3xl font-bold text-red-600">
            {products.filter(p => p.stock < 10).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Inventory Value</h3>
          <p className="text-3xl font-bold text-purple-600">
            ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}