import React from "react";

export default function Card({
  children,
  className = "",
  onClick,
  ...rest
}) {
  // Jika onClick ada, tambahkan cursor-pointer dan role="button" untuk aksesibilitas
  const clickableStyles = onClick ? "cursor-pointer" : "";

  // Handler untuk keyboard (Enter/Space) untuk aksesibilitas
  const handleKeyDown = (event) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      onClick(event);
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 shadow rounded p-4 ${clickableStyles} ${className}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}
