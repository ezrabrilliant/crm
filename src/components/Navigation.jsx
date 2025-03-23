import React from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="bg-blue-600 dark:bg-blue-800 text-white py-4">
      <div className="container mx-auto flex space-x-6">
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
    </nav>
  );
}
