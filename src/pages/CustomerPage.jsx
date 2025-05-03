// src/pages/CustomerPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

import ErrorAlert from "../components/ErrorAlert";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import CustomerSummary from "../components/customer/CustomerSummary";
import CustomerTable from "../components/customer/CustomerTable";
import CustomerForm from "../components/customer/CustomerForm";

export default function CustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [tiers, setTiers] = useState(null);
  const [form, setForm] = useState({ _id: null, name: "", totalSpent: 0, purchases: 0 });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const analyzeTiers = data => {
    setTiers({
      premium: data.filter(c => c.purchases >= 5).length,
      regular: data.filter(c => c.purchases >= 3 && c.purchases < 5).length,
      new: data.filter(c => c.purchases < 3).length,
      totalCustomers: data.length,
      totalRevenue: data.reduce((sum, c) => sum + Number(c.totalSpent), 0),
    });
  };

  const fetchCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/api/customers");
      setCustomers(data);
      analyzeTiers(data);
    } catch (err) {
      setError("Failed to load customers.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "name" ? value : Number(value)
    }));
  };

  const resetForm = () => {
    setForm({ _id: null, name: "", totalSpent: 0, purchases: 0 });
    setIsEditing(false);
  };

  const handleAddClick = () => {
    resetForm();
    setIsFormVisible(v => !v);
  };

  const handleEdit = customer => {
    setForm({ ...customer });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (_id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    setIsLoading(true);
    try {
      await axios.delete(`/api/customers/${_id}`);
      const next = customers.filter(c => c._id !== _id);
      setCustomers(next);
      analyzeTiers(next);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete customer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePromo = async customer => {
    // your existing create-promo logic here...
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await axios.put(`/api/customers/${form._id}`, {
          name: form.name,
          totalSpent: form.totalSpent,
          purchases: form.purchases
        });
      } else {
        // For new customers, only send the required fields
        const { name, totalSpent, purchases } = form;
        console.log("Submitting new customer:", { name, totalSpent, purchases });
        await axios.post("/api/customers", { name, totalSpent, purchases });
      }
      await fetchCustomers();
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to save customer.");
      setIsLoading(false);
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Customer Management</h1>

      {error && <ErrorAlert message={error} onClose={() => setError(null)} />}

      {tiers && <CustomerSummary tiers={tiers} />}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar term={searchTerm} onChange={setSearchTerm} placeholder="Search customers..." />
          <Button onClick={handleAddClick} className="bg-green-500 hover:bg-green-600">
            {isFormVisible ? "Hide Form" : "Add New Customer"}
          </Button>
      </div>

      {isFormVisible && (
        <Card className="mb-6">
          <CardContent>
            <CustomerForm
              form={form}
              isEditing={isEditing}
              isLoading={isLoading}
              onChange={handleChange}
              onCancel={() => { resetForm(); setIsFormVisible(false); }}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          {isLoading
            ? <Loader size="lg" />
            : <CustomerTable
                customers={filtered}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreatePromo={handleCreatePromo}
              />
          }
        </CardContent>
      </Card>
    </div>
  );
}