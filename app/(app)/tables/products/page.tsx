"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Product {
  productId: string;
  productName: string;
  category: string;
  subCategory: string;
}

const ProductsTable = () => {
  const [data, setData] = useState<Product[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        setData(json);
      } finally {
        setPending(false);
      }
    }
    fetchData();
  }, []);

  const columns: TableColumn<Product>[] = [
    { name: "Product ID", selector: (row) => row.productId, sortable: true },
    { name: "Name", selector: (row) => row.productName, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    {
      name: "Sub Category",
      selector: (row) => row.subCategory,
      sortable: true,
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-neutral p-4 border border-stone-200 shadow w-full h-full flex flex-col">
        <h2 className="font-bold text-gray-800 mb-2">Products</h2>
        <p className="text-xs mb-4">
          Product catalog with categories and sub-categories.
        </p>
        <div className="flex-1 overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
            progressPending={pending}
            pagination
            highlightOnHover
            dense
            fixedHeader
            fixedHeaderScrollHeight="60vh"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
