// src/pages/ProductPage.jsx
import React, { useState } from "react";
import data from "../data/data.json";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

export default function ProductPage() {
  // Memuat data produk dari data.json
  const [products] = useState(data.products);

  // State untuk orders (order hanya menyimpan productId dan quantity)
  const [orders, setOrders] = useState([]);

  // Form untuk menambah order: hanya productId dan quantity
  const [form, setForm] = useState({ productId: "", quantity: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productId || !form.quantity) {
      alert("Please select a product and enter quantity");
      return;
    }
    // Cek apakah produk sudah pernah dipesan oleh user
    const productAlreadyOrdered = orders.some(
      (order) => order.productId === parseInt(form.productId, 10)
    );
    if (productAlreadyOrdered) {
      alert("This product has already been used by the user.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      productId: parseInt(form.productId, 10),
      quantity: parseInt(form.quantity, 10)
    };

    // Tambahkan order baru ke state
    setOrders([...orders, newOrder]);

    // Reset form
    setForm({ productId: "", quantity: "" });
  };

  // Menghitung total pembelian untuk setiap produk berdasarkan orders
  const getTotalPurchased = (productId) => {
    return orders.reduce(
      (total, order) =>
        order.productId === productId ? total + order.quantity : total,
      0
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Product Orders</h1>
      <Card>
        <CardContent>
          {/* FORM TAMBAH ORDER */}
          <form onSubmit={handleSubmit} className="mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 dark:text-gray-300">Product:</label>
                <select
                  name="productId"
                  value={form.productId}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                >
                  <option value="">Select product</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 dark:text-gray-300">Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 p-2 w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                Add Order
              </Button>
            </div>
          </form>

          {/* TABEL LIST ORDERS */}
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Orders List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-gray-200">Product</th>
                  <th className="px-4 py-2 dark:text-gray-200">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order) => {
                  const productName =
                    products.find((p) => p.id === order.productId)?.name || "";
                  return (
                    <tr key={order.id}>
                      <td className="px-4 py-2 dark:text-gray-100">{productName}</td>
                      <td className="px-4 py-2 dark:text-gray-100">{order.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* TABEL CURRENT PRODUCT STOCK */}
          <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-white">Current Product Stock</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-gray-200">Product</th>
                  <th className="px-4 py-2 dark:text-gray-200">Total Purchased</th>
                  <th className="px-4 py-2 dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="px-4 py-2 dark:text-gray-100">{prod.name}</td>
                    <td className="px-4 py-2 dark:text-gray-100">{getTotalPurchased(prod.id)}</td>
                    <td className="px-4 py-2 dark:text-gray-100">
                      {getTotalPurchased(prod.id) > 0 ? "Used" : "Not Used"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
