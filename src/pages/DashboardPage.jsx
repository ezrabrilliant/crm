// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashboardPage() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [promos, setPromos] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data dari server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, promoRes, prodRes, orderRes] = await Promise.all([
          axios.get("/api/customers"),
          axios.get("/api/promos"),
          axios.get("/api/products"),
          axios.get("/api/orders"),
        ]);
        setCustomers(custRes.data);
        setPromos(promoRes.data);
        setProducts(prodRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Failed fetching data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="p-4">Loading...</p>;
  }

  // Summary overview
  const totalCustomers = customers.length;
  const totalPromos = promos.length;
  const totalProducts = products.length;

  // Recent promos: ambil 2 data pertama
  const recentPromos = promos.slice(0, 2);

  // Detail customer: gunakan customer pertama
  const selectedCustomer = customers[0];
  // Karena pada schema order, customer adalah string (nama), filter berdasarkan itu:
  const customerOrders = selectedCustomer
    ? orders.filter((o) => o.customer === selectedCustomer.name)
    : [];

  // Fungsi styling status promo
  const getStatusBadge = (promo) => {
    if (promo.status === "Accepted") {
      return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300";
    } else if (promo.status === "Pending") {
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    } else if (promo.status === "Rejected") {
      return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300";
    } else {
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusLabel = (promo) => {
    if (promo.status === "Accepted") {
      return promo.used ? "Accepted (Used)" : "Accepted (Not Used)";
    }
    return promo.status;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-4">
          {/* Card Customers */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-3-3h-3M9 20H4v-2a3 3 
                     0 013-3h3m0 0a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Customers</p>
              <p className="text-2xl font-bold dark:text-white">
                {totalCustomers}
              </p>
            </div>
          </div>

          {/* Card Promos */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 21h6a2 2 0 002-2v-5H7v5a2 2 0 002 2zM9 7h6m-7 4h8M9 3h6v4H9V3z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Promos</p>
              <p className="text-2xl font-bold dark:text-white">
                {totalPromos}
              </p>
            </div>
          </div>

          {/* Card Products */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V5a4 4 0 10-8 0v6M5 11h14l1 9H4l1-9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Products</p>
              <p className="text-2xl font-bold dark:text-white">
                {totalProducts}
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:col-span-3 space-y-6">
          {/* Recent Promos */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
              <h2 className="text-xl font-semibold dark:text-white">
                Recent Promos
              </h2>
              <Link
                to="/promos"
                className="text-blue-500 hover:underline text-sm mt-2 sm:mt-0"
              >
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {recentPromos.map((promo) => {
                // Karena promo.customer adalah string, cari data customer dari state
                const relatedCustomer = customers.find(
                  (c) => c.name === promo.customer
                );
                let totalSpentC = relatedCustomer ? relatedCustomer.totalSpent : 0;
                const formattedTotalSpent = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalSpentC).replace(".00", "");
                const purchasesC = relatedCustomer ? relatedCustomer.purchases : 0;
                const badgeClass = getStatusBadge(promo);

                return (
                  <div
                    key={promo._id || promo.id}
                    onClick={() => navigate("/promos")}
                    className="bg-gray-50 dark:bg-gray-700 
                               p-4 rounded cursor-pointer
                               transition-transform transform 
                               sm:hover:scale-105 w-full relative"
                  >
                    {/* Layout MOBILE */}
                    <div className="block sm:hidden">
                      <div className="absolute top-2 right-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${badgeClass}`}
                        >
                          {getStatusLabel(promo)}
                        </span>
                      </div>
                      <div className="font-bold text-lg dark:text-white mb-1">
                        {promo.customer || "Unknown Customer"}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        Total Spend: ${formattedTotalSpent} | Purchases: {purchasesC}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-green-600 font-semibold">
                          Discount {promo.discount}%
                        </div>
                        <div className="text-sm text-gray-500">
                          {promo.date}
                        </div>
                      </div>
                    </div>

                    {/* Layout DESKTOP */}
                    <div className="hidden sm:flex sm:justify-between sm:items-center">
                      <div>
                        <div className="font-bold text-lg dark:text-white">
                          {promo.customer || "Unknown Customer"}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Spend: {formattedTotalSpent} | Purchases: {purchasesC}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block px-2 py-1 mt-1 text-xs font-semibold rounded-full ${badgeClass}`}
                        >
                          {getStatusLabel(promo)}
                        </span>
                        <div className="text-green-600 font-semibold">
                          Discount {promo.discount}%
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {promo.date}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {recentPromos.length === 0 && (
                <p className="text-gray-500">No recent promos available.</p>
              )}
            </div>
          </div>

          {/* Detail Customer */}
          {selectedCustomer && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">
                    {selectedCustomer.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Total Spend: {new Intl.NumberFormat("en-US", {style: "currency",currency: "USD",}).format(selectedCustomer.totalSpent).replace(".00", "")} | Purchases:{" "}
                    {selectedCustomer.purchases}x
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                  <span className="bg-green-100 text-green-600 text-xs uppercase px-2 py-1 rounded">
                    Purchased
                  </span>
                  <svg
                    onClick={() => navigate("/customers")}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                {orders.filter(o => o.customer === selectedCustomer.name)
                  .map((order) => {
                    const product = products.find(
                      (p) => p.id === order.productId
                    );
                    return (
                      <div key={order._id || order.id}>
                        <p className="text-blue-500 font-bold">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                        <p>
                          {order.quantity} pcs | {product ? product.name : "Unknown"} | {product ? product.dimensions : 0}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
