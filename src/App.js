// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CustomerPage from "./pages/CustomerPage";
import ProductPage from "./pages/ProductPage";
import DashboardPage from "./pages/DashboardPage";
import PromoPage from "./pages/PromoPage";

function App() {
  // Inisialisasi dari localStorage (jika belum ada, default light)
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Efek samping: setiap kali darkMode berubah
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      {/* Wrapper global dengan class dark:bg/... */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        {/* Kirim state & setter ke Navigation */}
        <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="p-4">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/promos" element={<PromoPage />} />
            <Route path="*" element={<DashboardPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
