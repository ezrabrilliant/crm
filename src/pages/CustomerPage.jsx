import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Customer A", email: "a@example.com" },
    { id: 2, name: "Customer B", email: "b@example.com" },
  ]);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Menambah atau mengupdate customer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setCustomers(customers.map((c) => (c.id === form.id ? form : c)));
      setIsEditing(false);
    } else {
      const newCustomer = { ...form, id: Date.now() };
      setCustomers([...customers, newCustomer]);
    }
    setForm({ id: null, name: "", email: "" });
  };

  // Edit customer
  const handleEdit = (customer) => {
    setForm(customer);
    setIsEditing(true);
  };

  // Hapus customer
  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
              <label className="block mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
            </div>
            <Button type="submit">
              {isEditing ? "Update Customer" : "Add Customer"}
            </Button>
          </form>

          <h2 className="text-xl font-semibold mb-2">Customer List</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-2">{customer.name}</td>
                  <td className="px-4 py-2">{customer.email}</td>
                  <td className="px-4 py-2">
                    <Button onClick={() => handleEdit(customer)} className="mr-2">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(customer.id)} className="bg-red-500 hover:bg-red-600">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
