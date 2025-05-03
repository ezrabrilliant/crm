import React from "react";

export default function ProductSearchBar({ value, onChange }) {
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
        className="border p-2 pl-8 rounded w-full bg-white dark:bg-gray-800 dark:text-white"
      />
      <span className="absolute left-2 top-2.5">🔍</span>
    </div>
  );
}
