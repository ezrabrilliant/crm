import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

export default function ProductPage() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ product: "", quantity: "", comment: "" });

  // Menangani perubahan input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Menambahkan pesanan baru
  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = { ...form, id: Date.now() };
    setOrders([...orders, newOrder]);
    setForm({ product: "", quantity: "", comment: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Orders</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <label className="block mb-1">Product Name:</label>
              <input
                type="text"
                name="product"
                value={form.product}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Comment (optional):</label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </div>
            <Button type="submit">Add Order</Button>
          </form>

          <h2 className="text-xl font-semibold mb-2">Orders List</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Comment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">{order.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
