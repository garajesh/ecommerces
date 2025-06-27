import React, { useState, useEffect } from 'react';
import './ProductManage.css';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  // Define some example categories
  const categories = ['Electronics', 'Books', 'Clothing', 'Home & Kitchen', 'Sports', 'Toys'];

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '', // Default to empty string for initial state
    stock: '',
    image: '',
    brand: '',
    rating: 0,
    reviews: 0,
    tags: [],
    specifications: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/products");
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateProductAge = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    return Math.ceil((now - created) / (1000 * 60 * 60 * 24));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'Out of Stock', class: 'out-of-stock' };
    if (stock <= 5) return { status: 'Low Stock', class: 'low-stock' };
    if (stock <= 20) return { status: 'Medium Stock', class: 'medium-stock' };
    return { status: 'High Stock', class: 'high-stock' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value, updatedAt: new Date().toISOString() }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags, updatedAt: new Date().toISOString() }));
  };

  const openAddModal = () => {
    setFormData({
      id: '', name: '', description: '', price: '', category: '', stock: '', image: '', brand: '', rating: 0,
      reviews: 0, tags: [], specifications: {}, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    // Ensure category is set correctly for select dropdown
    setFormData({
      ...product,
      tags: product.tags || [],
      specifications: product.specifications || {},
      category: product.category || '', // Default to empty string if category is null/undefined
      updatedAt: new Date().toISOString()
    });
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0
    };

    try {
      const url = isEditMode ? `http://localhost:8080/api/products/${formData.id}` : "http://localhost:8080/api/products";
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error("Failed to save product");
      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error("Delete failed");
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter(product => {
    const match = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterBy === 'low-stock') return match && product.stock <= 5;
    if (filterBy === 'out-of-stock') return match && product.stock === 0;
    if (filterBy === 'old-products') return match && calculateProductAge(product.createdAt) > 90;
    return match;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return a.price - b.price;
      case 'stock': return a.stock - b.stock;
      case 'age': return new Date(b.createdAt) - new Date(a.createdAt);
      case 'category': return a.category.localeCompare(b.category);
      default: return 0;
    }
  });

  return (
    <div className="product-manage">
      <h1>Product Management</h1>
      <div className="controls">
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
          <option value="age">Sort by Age</option>
          <option value="category">Sort by Category</option>
        </select>
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="all">All Products</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="old-products">Old Products (90+ days)</option>
        </select>
        <button className="add-product-btn" onClick={openAddModal}>Add Product</button>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className={`stock-badge ${getStockStatus(product.stock).class}`}>
                {getStockStatus(product.stock).status}
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-brand">{product.brand}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-price">₹{product.price}</p>
              <div className="product-stats">
                <span>Stock: {product.stock}</span>
                <span>Age: {calculateProductAge(product.createdAt)} days</span>
                <span>Rating: {product.rating}/5</span>
              </div>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => openEditModal(product)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form className="modal-form" onSubmit={saveProduct}>
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formData.name ? 'input-valid' : 'input-invalid'} // Dynamic class for validation styling
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className={'input-valid'} // Always green unless specific validation needed
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3" // Adjust rows as needed
                  className={'input-valid'}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="price">Price *</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={formData.price ? 'input-valid' : 'input-invalid'}
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="stock">Stock Quantity *</label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className={formData.stock ? 'input-valid' : 'input-invalid'}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={formData.category ? 'input-valid' : 'input-invalid'}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group half-width">
                  <label htmlFor="image">Image URL</label>
                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={'input-valid'}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="rating">Rating</label>
                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className={'input-valid'}
                  />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="reviews">Reviews</label>
                  <input
                    id="reviews"
                    name="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={handleInputChange}
                    className={'input-valid'}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={handleTagsChange}
                  className={'input-valid'}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="add-product-btn">{isEditMode ? 'Update Product' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;