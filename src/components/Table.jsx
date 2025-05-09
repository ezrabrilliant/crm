import React from "react";

export default function Table({ children }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </table>
  );
}
