// src/components/PromoSummary.jsx
import React from "react";
import Card from "../Card";
import CardContent from "../CardContent";

export default function PromoSummary({ summary }) {
  const items = [
    { label: "Total Promos", value: summary.total, color: "blue" },
    { label: "Pending",     value: summary.pending, color: "yellow" },
    { label: "Active",      value: summary.active, color: "green" },
    { label: "Used",        value: summary.used, color: "purple" },
    { label: "Rejected",    value: summary.rejected, color: "red" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
      {items.map(({ label, value, color }) => (
        <Card key={label}>
          <CardContent className="text-center py-4">
            <div className={`text-3xl font-bold text-${color}-600 dark:text-${color}-400`}>
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
