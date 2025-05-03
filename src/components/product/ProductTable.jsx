import React from "react";
import Button from "../Button";
import Card from "../Card";
import CardContent from "../CardContent";

export default function ProductTable({ products, isLoading, sortConfig, requestSort, getSortIndicator, onEdit, onDelete, onRefresh }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4 dark:text-white">
          Product List {products.length > 0 && `(${products.length} items)`}
        </h2>

        {isLoading && <p className="text-center py-4">Loading products...</p>}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No products found. Add your first product to get started.</p>
          </div>
        )}

        {!isLoading && products.length > 0 && (
          <div className="overflow-x-auto rounded border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {["name", "stock", "price", "dimensions"].map((key) => (
                    <th
                      key={key}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => requestSort(key)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIndicator(key)}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 dark:text-gray-100">{product.name}</td>
                    <td className="px-4 py-3 dark:text-gray-100">
                      <span className={product.stock <= 5 ? "text-red-500 font-medium" : ""}>
                        {product.stock} {product.stock <= 5 && "(Low)"}
                      </span>
                    </td>
                    <td className="px-4 py-3 dark:text-gray-100">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 dark:text-gray-100">{product.dimensions}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button
                          onClick={() => onEdit(product)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-xs py-1 px-2"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => onDelete(product._id, product.name)}
                          className="bg-red-500 hover:bg-red-600 text-xs py-1 px-2"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button onClick={onRefresh} className="bg-gray-500 hover:bg-gray-600" disabled={isLoading}>
            {isLoading ? "Refreshing..." : "Refresh Products"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
