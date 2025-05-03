// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ darkMode, setDarkMode }) {
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/customers" className="hover:underline">
          Customers
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/promos" className="hover:underline">
          Promos
        </Link>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded focus:outline-none focus:ring"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
