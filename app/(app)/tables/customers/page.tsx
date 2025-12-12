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

  // modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // form state
  const [form, setForm] = useState<Partial<Customer>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

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

  function openCreateModal() {
    setEditing(null);
    setForm({});
    setOpen(true);
  }

  function openEditModal(row: Customer) {
    setEditing(row);
    setForm(row);
    setOpen(true);
  }

  async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`/api/customers?customerId=${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    fetchData();
  }

  async function handleSubmit() {
    if (editing) {
      // UPDATE
      await fetch(`/api/customers?customerId=${editing.customerId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      // CREATE
      await fetch(`/api/customers`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    setOpen(false);
    fetchData();
  }

  const columns: TableColumn<Customer>[] = [
    { name: "Customer ID", selector: (row) => row.customerId, sortable: true },
    { name: "Name", selector: (row) => row.customerName, sortable: true },
    { name: "Segment", selector: (row) => row.segment, sortable: true },
    { name: "Country", selector: (row) => row.country, sortable: true },
    { name: "City", selector: (row) => row.city },
    { name: "State", selector: (row) => row.state },
    { name: "Postal Code", selector: (row) => row.postalCode },
    { name: "Region", selector: (row) => row.region },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 underline cursor-pointer"
            onClick={() => openEditModal(row)}
          >
            Edit
          </button>
          <button
            className="text-red-600 underline cursor-pointer"
            onClick={() => setDeleteId(row.customerId)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-neutral p-4 border border-stone-200 shadow w-full h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800">Customers</h2>

          <button
            onClick={openCreateModal}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Add Customer
          </button>
        </div>

        <p className="text-xs mb-4">List of all registered customers.</p>

        <input
          type="text"
          className="border border-neutral-300 px-2 py-1"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex-1 overflow-hidden mt-4">
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={pending}
            pagination
            highlightOnHover
            dense
            fixedHeader
            fixedHeaderScrollHeight="60vh"
          />
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-120 border border-neutral-300 shadow shadow-black/30">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Customer" : "Add Customer"}
            </h3>

            {[
              ["customerId", "Customer Id"],
              ["customerName", "Customer Name"],
              ["segment", "Segment"],
              ["country", "Country"],
              ["city", "City"],
              ["state", "State"],
              ["postalCode", "Postal Code"],
              ["region", "Region"],
            ].map((key, index) => (
              <div className="text-sm flex items-center gap-1" key={index}>
                <label htmlFor={key[0]} className="w-50 text-sm">
                  {key[1]}
                </label>
                <input
                  key={key[0]}
                  placeholder={key[0]}
                  value={(form as any)[key[0]] || ""}
                  onChange={(e) =>
                    setForm({ ...form, [key[0]]: e.target.value })
                  }
                  className="border w-full mb-2 px-2 py-1 bg-neutral-50 border-neutral-300"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2 mt-3 text-sm">
              <button
                className="w-20 py-1 bg-neutral-200 rounded"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-20 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="font-semibold mb-4 text-red-600">
              Delete Customer?
            </h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete customer
              <span className="font-bold"> {deleteId}</span>?
            </p>

            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersTable;
