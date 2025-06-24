import React, { useState, useEffect } from 'react';
import './ProductManage.css';

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('manage');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products'));
    if (stored) {
      setProducts(stored);
    } else {
      const sampleProducts = []; // Optional: load default
      setProducts(sampleProducts);
      localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
  }, []);

  const calculateProductAge = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { status: 'Out of Stock', class: 'out-of-stock' };
    if (stock <= 5) return { status: 'Low Stock', class: 'low-stock' };
    if (stock <= 20) return { status: 'Medium Stock', class: 'medium-stock' };
    return { status: 'High Stock', class: 'high-stock' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags, updatedAt: new Date().toISOString() }));
  };

  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, [key]: value },
      updatedAt: new Date().toISOString()
    }));
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
    setFormData({ ...product, tags: product.tags || [], specifications: product.specifications || {}, updatedAt: new Date().toISOString() });
    setSelectedProduct(product);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsEditMode(false);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      ...formData,
      id: isEditMode ? formData.id : Date.now().toString(),
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      rating: parseFloat(formData.rating) || 0,
      reviews: parseInt(formData.reviews) || 0
    };

    const updatedProducts = isEditMode
      ? products.map(p => p.id === productData.id ? productData : p)
      : [...products, productData];

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    closeModal();
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
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
      default: return 0;
    }
  });

  return (
    <div className="product-manage">
      <h1>Product Management</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
          <option value="age">Sort by Age</option>
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
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Brand</label>
                  <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} step="0.01" required />
                </div>
                <div className="form-group">
                  <label>Stock Quantity *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                    <option value="Books">Books</option>
                    <option value="Beauty">Beauty</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input type="url" name="image" value={formData.image} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="5" step="0.1" />
                </div>
                <div className="form-group">
                  <label>Reviews</label>
                  <input type="number" name="reviews" value={formData.reviews} onChange={handleInputChange} min="0" />
                </div>
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" value={formData.tags.join(', ')} onChange={handleTagsChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-btn">{isEditMode ? 'Update Product' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;
