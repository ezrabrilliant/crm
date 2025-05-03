// src/components/Loader.jsx
import React from "react";
import { RefreshCw } from "lucide-react";

export default function Loader({ size = "lg" }) {
  const dims = size === "sm" ? "w-5 h-5" : "w-12 h-12";
  return (
    <div className="flex justify-center items-center py-8">
      <RefreshCw className={`${dims} animate-spin text-gray-400`} />
    </div>
  );
}
