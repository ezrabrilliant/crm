// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ term, onChange, placeholder = "Search…" }) {
  return (
    <div className="relative w-full sm:w-64">
      <input
        type="text"
        value={term}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        🔍
      </span>
    </div>
  );
}
