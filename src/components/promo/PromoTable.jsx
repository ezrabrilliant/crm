// src/components/PromoTable.jsx
import React from "react";
import Button from "../Button";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function PromoTable({ promos, onApprove, onReject, onMarkUsed }) {
  const getBadgeClasses = promo => {
    if (promo.status === "Accepted") {
      return promo.used
        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
        : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
    }
    if (promo.status === "Rejected") {
      return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
    }
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
  };

  const getLabel = promo => {
    if (promo.status === "Accepted") return promo.used ? "Used" : "Active";
    return promo.status;
  };

  const getIcon = promo => {
    if (promo.status === "Accepted") return <CheckCircle className="w-4 h-4 mr-1" />;
    if (promo.status === "Rejected") return <XCircle className="w-4 h-4 mr-1" />;
    return <Clock className="w-4 h-4 mr-1" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {["ID", "Customer", "Code", "Status", "Date", "Actions"].map((h, i) => (
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
          {promos.map(promo => (
            <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-4 py-3 dark:text-gray-100">#{promo.id}</td>
              <td className="px-4 py-3 dark:text-gray-100">{promo.customer}</td>
              <td className="px-4 py-3 font-mono dark:text-gray-100">
                {promo.promoCode || "-"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeClasses(
                    promo
                  )}`}
                >
                  {getIcon(promo)}
                  {getLabel(promo)}
                </span>
              </td>
              <td className="px-4 py-3 dark:text-gray-100">
                {new Date(promo.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                {promo.status === "Pending" ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => onApprove(promo.id)}
                      className="bg-green-500 hover:bg-green-600 text-xs px-2 py-1"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onReject(promo.id)}
                      className="bg-red-500 hover:bg-red-600 text-xs px-2 py-1"
                    >
                      Reject
                    </Button>
                  </div>
                ) : promo.status === "Accepted" && !promo.used ? (
                  <Button
                    onClick={() => onMarkUsed(promo.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-xs px-2 py-1"
                  >
                    Mark Used
                  </Button>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
