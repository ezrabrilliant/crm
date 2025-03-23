// src/pages/CustomerPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    id: null,
    name: "",
    totalSpent: 0,
    purchases: 0,
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch customers dari API saat komponen mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get("/api/customers");
        setCustomers(res.data);
      } catch (err) {
        console.error("Failed fetching customers", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Handle perubahan form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form: buat baru atau update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update customer (route: PUT /api/customers/:id)
        await axios.put(`/api/customers/${form.id}`, form);
      } else {
        // Buat customer baru (route: POST /api/customers)
        await axios.post("/api/customers", form);
      }
      // Refresh data customer
      const res = await axios.get("/api/customers");
      setCustomers(res.data);
      setIsEditing(false);
      setForm({ id: null, name: "", totalSpent: 0, purchases: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit: set form dengan data customer yang dipilih
  const handleEdit = (customer) => {
    setForm(customer);
    setIsEditing(true);
  };

  // Delete customer (route: DELETE /api/customers/:id)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/customers/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Contoh logika: Propose Promo
  // Misalnya, membuat promo baru untuk customer dengan discount otomatis
  const handleCreatePromo = async (customer) => {
    let recommendedDiscount = 0;
    if (customer.purchases >= 5) recommendedDiscount = 15;
    else if (customer.purchases >= 3) recommendedDiscount = 10;
    try {
      await axios.post("/api/promos", {
        // Gunakan Date.now() untuk membuat id numerik custom
        id: Date.now(),
        customer: customer.name, // sesuai schema promo: customer adalah string
        promoCode: "AUTO" + recommendedDiscount,
        status: "Pending",
        used: false,
        discount: recommendedDiscount,
        date: new Date().toLocaleString(),
      });
      alert(
        `Promo created for ${customer.name} with ${recommendedDiscount}% discount.
Waiting for admin approval.`
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <p className="p-4">Loading Customers...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Customer Management
      </h1>
      <Card>
        <CardContent>
          {/* FORM TAMBAH/EDIT CUSTOMER */}
          <form onSubmit={handleSubmit} className="mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 dark:text-gray-300">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 dark:text-gray-300">Total Spent:</label>
                <input
                  type="number"
                  name="totalSpent"
                  value={form.totalSpent}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 dark:text-gray-300">Purchases:</label>
                <input
                  type="number"
                  name="purchases"
                  value={form.purchases}
                  onChange={handleChange}
                  className="border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                {isEditing ? "Update Customer" : "Add Customer"}
              </Button>
            </div>
          </form>

          {/* TABEL CUSTOMER */}
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            Customer List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-gray-200">Name</th>
                  <th className="px-4 py-2 dark:text-gray-200">Total Spent</th>
                  <th className="px-4 py-2 dark:text-gray-200">Purchases</th>
                  <th className="px-4 py-2 dark:text-gray-200 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-4 py-2 dark:text-gray-100">
                      {customer.name}
                    </td>
                    <td className="px-4 py-2 dark:text-gray-100">
                      ${customer.totalSpent}
                    </td>
                    <td className="px-4 py-2 dark:text-gray-100">
                      {customer.purchases}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center items-center space-x-2">
                        <Button
                          onClick={() => handleCreatePromo(customer)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M17.707 10.293l-5-5A1 1 0 0012 5H5a1 1 0 00-1 1v7a1 1 0 00.293.707l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" />
                          </svg>
                          Propose Promo
                        </Button>
                        <Button
                          onClick={() => handleEdit(customer)}
                          className="bg-yellow-500 hover:bg-yellow-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
                            />
                          </svg>
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(customer.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
                            />
                          </svg>
                          Delete
                        </Button>
                      </div>
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
