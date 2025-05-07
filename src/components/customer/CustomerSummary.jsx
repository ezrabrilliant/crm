// src/components/CustomerSummary.jsx
import React from "react";
import Card from "../Card";
import CardContent from "../CardContent";

export default function CustomerSummary({ tiers }) {
  const items = [
    { label: "Total",   value: tiers.totalCustomers, color: "blue" },
    { label: "Premium", value: tiers.premium,        color: "purple" },
    { label: "Regular", value: tiers.regular,        color: "green" },
    { label: "New",     value: tiers.new,            color: "teal" },
    { label: "Revenue", value: `$${tiers.totalRevenue.toLocaleString()}`, color: "yellow" },
  ];

  // map warna ke class Tailwind
  const colorClasses = {
    blue:   "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    green:  "text-green-600 dark:text-green-400",
    teal:   "text-teal-600 dark:text-teal-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
      {items.map(({ label, value, color }) => (
        <Card key={label}>
          <CardContent className="text-center py-4">
            <div className={`text-3xl font-bold ${colorClasses[color]}`}>
              {value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {label}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
