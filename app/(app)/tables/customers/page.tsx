"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Customer {
  customerId: string;
  customerName: string;
  segment: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  region: string;
}

const CustomersTable = () => {
  const [data, setData] = useState<Customer[]>([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/customers");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setPending(false);
      }
    }
    fetchData();
  }, []);

  const columns: TableColumn<Customer>[] = [
    { name: "Customer ID", selector: (row) => row.customerId, sortable: true },
    { name: "Name", selector: (row) => row.customerName, sortable: true },
    { name: "Segment", selector: (row) => row.segment, sortable: true },
    { name: "Country", selector: (row) => row.country, sortable: true },
    { name: "City", selector: (row) => row.city },
    { name: "State", selector: (row) => row.state },
    { name: "Postal Code", selector: (row) => row.postalCode },
    { name: "Region", selector: (row) => row.region },
  ];

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-neutral p-4 border border-stone-200 shadow w-full h-full flex flex-col">
        <h2 className="font-bold text-gray-800 mb-2">Customers</h2>
        <p className="text-xs mb-4">
          List of all registered customers in the database.
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
            customStyles={{
              headCells: {
                style: {
                  backgroundColor: "#f3f4f6",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                },
              },
              cells: {
                style: { fontSize: "0.875rem" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
