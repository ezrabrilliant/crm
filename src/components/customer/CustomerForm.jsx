// src/components/CustomerForm.jsx
import React from "react";
import Button from "../Button";

export default function CustomerForm({
  form,
  isEditing,
  isLoading,
  onChange,
  onCancel,
  onSubmit
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 dark:text-gray-300">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 dark:text-gray-300">Total Spent ($)</label>
          <input
            type="number"
            name="totalSpent"
            value={form.totalSpent}
            onChange={onChange}
            required
            min="0"
            step="0.01"
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 dark:text-gray-300">Purchases</label>
          <input
            type="number"
            name="purchases"
            value={form.purchases}
            onChange={onChange}
            required
            min="0"
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
          {isLoading ? "Saving..." : isEditing ? "Update" : "Add"}
        </Button>
      </div>
    </form>
  );
}
