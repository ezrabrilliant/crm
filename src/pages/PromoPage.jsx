// src/pages/PromoPage.jsx
import React, { useState } from "react";
import data from "../data/data.json"; // Pastikan data.json sudah memiliki properti "used" di setiap promo
import Button from "../components/Button";
import Card from "../components/Card";
import CardContent from "../components/CardContent";

export default function PromoPage() {
  // Memuat data promos dari data.json
  const [promos, setPromos] = useState(data.promos);

  // Fungsi untuk mengembalikan styling badge sesuai status promo dan used flag
  const getStatusBadge = (promo) => {
    if (promo.status === "Accepted") {
      return promo.used
        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
    } else if (promo.status === "Rejected") {
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    } else {
      // Pending
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  // Fungsi untuk mengembalikan label status promo
  const getStatusLabel = (promo) => {
    if (promo.status === "Accepted") {
      return promo.used ? "Accepted (Used)" : "Accepted (Not Used)";
    }
    return promo.status;
  };

  // Fungsi untuk handle Approve
  const handleApprove = (promoId) => {
    const newCode = prompt("Enter discount/promo code:", "");
    setPromos((prevPromos) =>
      prevPromos.map((p) =>
        p.id === promoId
          ? {
              ...p,
              status: "Accepted",
              used: false,
              promoCode: newCode || p.promoCode, // Jika input kosong, gunakan promoCode lama
            }
          : p
      )
    );
  };

  // Fungsi untuk handle Reject
  const handleReject = (promoId) => {
    setPromos((prevPromos) =>
      prevPromos.map((p) =>
        p.id === promoId ? { ...p, status: "Rejected", used: false } : p
      )
    );
  };

  // Fungsi untuk menandai promo sebagai sudah digunakan
  const handleMarkAsUsed = (promoId) => {
    setPromos((prevPromos) =>
      prevPromos.map((p) =>
        p.id === promoId ? { ...p, used: true } : p
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Promo Management
      </h1>
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 dark:text-gray-200">Promo ID</th>
                  <th className="px-4 py-2 dark:text-gray-200">Customer</th>
                  <th className="px-4 py-2 dark:text-gray-200">Promo Code</th>
                  <th className="px-4 py-2 dark:text-gray-200">Status</th>
                  <th className="px-4 py-2 dark:text-gray-200">Date</th>
                  <th className="px-4 py-2 dark:text-gray-200 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {promos.map((promo) => (
                  <tr key={promo.id}>
                    <td className="px-4 py-2 dark:text-gray-100">{promo.id}</td>
                    <td className="px-4 py-2 dark:text-gray-100">{promo.customer}</td>
                    <td className="px-4 py-2 dark:text-gray-100">{promo.promoCode}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(promo)}`}
                      >
                        {getStatusLabel(promo)}
                      </span>
                    </td>
                    <td className="px-4 py-2 dark:text-gray-100">{promo.date}</td>
                    <td className="px-4 py-2">
                      {promo.status === "Pending" ? (
                        <div className="flex justify-center items-center space-x-2">
                          <Button
                            onClick={() => handleApprove(promo.id)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(promo.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : promo.status === "Accepted" && !promo.used ? (
                        <div className="flex justify-center items-center">
                          <Button
                            onClick={() => handleMarkAsUsed(promo.id)}
                            className="bg-blue-500 hover:bg-blue-600"
                          >
                            Mark as Used
                          </Button>
                        </div>
                      ) : (
                        <span className="dark:text-gray-300 text-gray-600 text-center block">
                          No action
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
