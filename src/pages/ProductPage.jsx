import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import Button from "../components/Button";
import ProductForm from "../components/product/ProductForm";
import ProductTable from "../components/product/ProductTable";
import ProductSearchBar from "../components/product/ProductSearchBar";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", stock: 0, price: 0, dimensions: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" });
  
  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
  
  useEffect(() => {
    if (products.length > 0) {
      console.log("Sample product structure:", products[0]);
    }
  }, [products]);
  
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null); // Clear previous errors
      const res = await axios.get("/api/products");
      console.log("Products response:", res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error details:", err.response?.data || err.message);
      setError(`Failed to load products: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form:", form);
      setIsLoading(true);
      setError(null); // Clear previous errors
      
      // Create a copy of the form data to ensure we're sending the right structure
      const productData = { 
        name: form.name,
        stock: Number(form.stock),
        price: Number(form.price),
        dimensions: form.dimensions
      };
      
      if (isEditing) {
        await axios.patch(`/api/products/${form.id}`, productData);
      } else {
        // For new products, don't include the id field at all
        const response = await axios.post("/api/products", productData);
        console.log("Server response:", response.data);
      }
      
      await fetchProducts();
      setIsFormVisible(false);
      resetForm();
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setError(`Failed to save product: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ id: null, name: "", stock: 0, price: 0, dimensions: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    // Ensure we're correctly mapping the product fields
    setForm({
      id: product._id, // Use _id from MongoDB
      name: product.name,
      stock: product.stock,
      price: product.price,
      dimensions: product.dimensions
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      setError(null); // Clear previous errors
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete product.");
    }
  };

  const requestSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "ascending" ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    const filtered = products.filter((p) => 
      p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return [...filtered].sort((a, b) => {
      // Handle null or undefined values
      const aValue = a[sortConfig.key] !== undefined ? a[sortConfig.key] : '';
      const bValue = b[sortConfig.key] !== undefined ? b[sortConfig.key] : '';
      
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const getSortIndicator = (key) =>
    sortConfig.key === key ? (sortConfig.direction === "ascending" ? " ↑" : " ↓") : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Product Management</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 relative">
          {error}
          <span className="absolute right-4 cursor-pointer" onClick={() => setError(null)}>&times;</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
        <ProductSearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button onClick={() => { resetForm(); setIsFormVisible(!isFormVisible); }} className="bg-green-500 hover:bg-green-600">
          {isFormVisible ? "Hide Form" : "Add Product"}
        </Button>
      </div>

      {isFormVisible && (
        <ProductForm
          form={form}
          isEditing={isEditing}
          isLoading={isLoading}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onCancel={() => { resetForm(); setIsFormVisible(false); }}
        />
      )}

      <ProductTable
        products={getSortedProducts()}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={fetchProducts}
        requestSort={requestSort}
        getSortIndicator={getSortIndicator}
      />
    </div>
  );
}