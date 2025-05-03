import React from "react";
import Button from "../Button";
import Card from "../Card";
import CardContent from "../CardContent";

export default function ProductForm({ form, isEditing, isLoading, onChange, onSubmit, onCancel }) {
  return (
    <Card className="mb-6">
      <CardContent>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["name", "dimensions"].map((field) => (
              <div className="flex flex-col" key={field}>
                <label className="mb-1 dark:text-gray-300 capitalize">{field}:</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={onChange}
                  required
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder={`Enter product ${field}`}
                />
              </div>
            ))}
            {["stock", "price"].map((field) => (
              <div className="flex flex-col" key={field}>
                <label className="mb-1 dark:text-gray-300 capitalize">{field}:</label>
                <input
                  type="number"
                  name={field}
                  value={form[field]}
                  onChange={onChange}
                  required
                  min="0"
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel} type="button" className="bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Saving..." : isEditing ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
