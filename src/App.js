import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerPage from "./pages/CustomerPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/dashboard" className="mr-4 text-blue-500">Dashboard</Link>
          <Link to="/customers" className="mr-4 text-blue-500">Customers</Link>
          <Link to="/products" className="text-blue-500">Products</Link>
        </nav>
        <Routes>
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<CustomerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
