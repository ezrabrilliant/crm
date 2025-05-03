// src/components/ErrorAlert.jsx
import React from "react";
import { XCircle } from "lucide-react";

export default function ErrorAlert({ message, onClose }) {
  return (
    <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start">
      <XCircle className="w-5 h-5 flex-shrink-0 mr-2" />
      <div className="flex-1">
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-red-700 hover:text-red-900">
          ✕
        </button>
      )}
    </div>
  );
}
