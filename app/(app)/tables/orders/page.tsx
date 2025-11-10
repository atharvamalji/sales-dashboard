"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Order {
  orderId: string;
  orderDate: string;
  shipDate: string;
  shipMode: string;
  customerId: string;
}

const OrdersTable = () => {
  const [data, setData] = useState<Order[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/orders");
        const json = await res.json();
        setData(json);
      } finally {
        setPending(false);
      }
    }
    fetchData();
  }, []);

  const columns: TableColumn<Order>[] = [
    { name: "Order ID", selector: (row) => row.orderId, sortable: true },
    { name: "Order Date", selector: (row) => row.orderDate },
    { name: "Ship Date", selector: (row) => row.shipDate },
    { name: "Ship Mode", selector: (row) => row.shipMode },
    { name: "Customer ID", selector: (row) => row.customerId },
  ];

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-neutral p-4 border border-stone-200 shadow w-full h-full flex flex-col">
        <h2 className="font-bold text-gray-800 mb-2">Orders</h2>
        <p className="text-xs mb-4">
          Order metadata including ship details and customer ID.
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

export default OrdersTable;
