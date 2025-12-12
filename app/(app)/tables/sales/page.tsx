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

  // modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Sale | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // form state
  const [form, setForm] = useState<Partial<Sale>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/sales");
      const json = await res.json();
      setData(json);
    } finally {
      setPending(false);
    }
  }

  // open modal - CREATE
  function openCreateModal() {
    setEditing(null);
    setForm({});
    setOpen(true);
  }

  // open modal - EDIT
  function openEditModal(row: Sale) {
    setEditing(row);
    setForm(row);
    setOpen(true);
  }

  // CREATE + UPDATE
  async function handleSubmit() {
    if (editing) {
      await fetch(`/api/sales?salesId=${editing.salesId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`/api/sales`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    setOpen(false);
    fetchData();
  }

  // DELETE
  async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`/api/sales?salesId=${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    fetchData();
  }

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns: TableColumn<Sale>[] = [
    {
      name: "Sales ID",
      selector: (row) => row.salesId.toString(),
      sortable: true,
    },
    { name: "Order ID", selector: (row) => row.orderId, sortable: true },
    { name: "Product ID", selector: (row) => row.productId, sortable: true },

    {
      name: "Sales ($)",
      selector: (row) => Number(row.sales).toFixed(2),
      sortable: true,
      style: { textAlign: "right" },
    },
    {
      name: "Qty",
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
            onClick={() => setDeleteId(row.salesId)}
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
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800">Sales</h2>

          <button
            onClick={openCreateModal}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Add Sale
          </button>
        </div>

        <p className="text-xs mb-4">
          Sales line items with quantity, discount, and profit values.
        </p>

        {/* Search */}
        <input
          type="text"
          className="border border-neutral-300 px-2 py-1"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
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

      {/* Create / Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-120 border border-neutral-300 shadow shadow-black/30">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Sale" : "Add Sale"}
            </h3>

            {[
              ["orderId", "Order ID"],
              ["productId", "Product ID"],
              ["sales", "Sales ($)"],
              ["quantity", "Quantity"],
              ["discount", "Discount"],
              ["profit", "Profit ($)"],
            ].map(([key, label, index]) => (
              <div className="text-sm flex items-center gap-1" key={index}>
                <label className="w-40 text-sm">{label}</label>
                <input
                  value={(form as any)[key] || ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
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

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="font-semibold mb-4 text-red-600">Delete Sale?</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete sale{" "}
              <span className="font-bold">{deleteId}</span>?
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

export default SalesTable;
