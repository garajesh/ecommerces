import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchProducts = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/admin/product-details", {
        search,
        category,
        sortBy,
        sortOrder,
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sortBy, sortOrder]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Product Details</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or brand"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-60"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home & kitchen">Home & kitchen</option>
          <option value="Sports">Sports</option>
          <option value="Toys">Toys</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
          <option value="rating">Rating</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-indigo-600 text-white text-sm">
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Reviews</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Featured</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Updated</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3 text-green-600 font-medium">₹ {product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3">{product.rating} ★</td>
                <td className="p-3">{product.reviews}</td>
                <td className="p-3">
                  {product.tags?.slice(0, 3).join(", ")}
                  {product.tags?.length > 3 && "…"}
                </td>
                <td className="p-3">
                  {product.featured ? (
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">
                      No
                    </span>
                  )}
                </td>
                <td className="p-3">
                  {new Date(product.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
