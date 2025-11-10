"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Sale {
  salesId: number;
  orderId: string;
  productId: string;
  sales: string;
  quantity: number;
  discount: string;
  profit: string;
}

const SalesTable = () => {
  const [data, setData] = useState<Sale[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/sales");
        const json = await res.json();
        setData(json);
      } finally {
        setPending(false);
      }
    }
    fetchData();
  }, []);

  const columns: TableColumn<Sale>[] = [
    // {
    //   name: "Sales ID",
    //   selector: (row) => row.salesId.toString(),
    //   sortable: true,
    // },
    // { name: "Order ID", selector: (row) => row.orderId, sortable: true },
    { name: "Product ID", selector: (row) => row.productId, sortable: true },
    {
      name: "Sales ($)",
      selector: (row) => Number(row.sales).toFixed(2),
      sortable: true,
      style: { textAlign: "right" },
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity.toString(),
      sortable: true,
      style: { textAlign: "right" },
    },
    {
      name: "Discount",
      selector: (row) => Number(row.discount).toFixed(2),
      sortable: true,
      style: { textAlign: "right" },
    },
    {
      name: "Profit ($)",
      selector: (row) => Number(row.profit).toFixed(2),
      sortable: true,
      style: { textAlign: "right" },
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-neutral p-4 border border-stone-200 shadow w-full h-full flex flex-col">
        <h2 className="font-bold text-gray-800 mb-2">Sales</h2>
        <p className="text-xs mb-4">
          Sales line items with quantity, discount, and profit values.
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

export default SalesTable;
