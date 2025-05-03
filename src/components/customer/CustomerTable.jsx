// src/components/CustomerTable.jsx
import React from "react";
import Button from "../Button";
import TierBadge from "../TierBadge";

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
  onCreatePromo
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {["Name", "Total Spent", "Purchases", "Tier", "Actions"].map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map(c => (
            <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 dark:text-gray-100">{c.name}</td>
              <td className="px-4 py-3 dark:text-gray-100">${c.totalSpent.toFixed(2)}</td>
              <td className="px-4 py-3 dark:text-gray-100">{c.purchases}</td>
              <td className="px-4 py-3 text-center"><TierBadge purchases={c.purchases} /></td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => onCreatePromo(c)} className="bg-green-500 hover:bg-green-600 text-xs px-2 py-1">
                    Add New Promo
                  </Button>
                  <Button onClick={() => onEdit(c)} className="bg-yellow-500 hover:bg-yellow-600 text-xs px-2 py-1">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(c._id, c.name)} className="bg-red-500 hover:bg-red-600 text-xs px-2 py-1">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
