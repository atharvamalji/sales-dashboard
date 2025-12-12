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

  // Modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);

  // Delete Confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form
  const [form, setForm] = useState<Partial<Order>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/orders");
      const json = await res.json();
      setData(json);
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }

  // Search filter
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  function openCreateModal() {
    setEditing(null);
    setForm({});
    setOpen(true);
  }

  function openEditModal(row: Order) {
    setEditing(row);
    setForm(row);
    setOpen(true);
  }

  async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`/api/orders?orderId=${deleteId}`, {
      method: "DELETE",
    });

    setDeleteId(null);
    fetchData();
  }

  async function handleSubmit() {
    if (editing) {
      await fetch(`/api/orders?orderId=${editing.orderId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`/api/orders`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    setOpen(false);
    fetchData();
  }

  const columns: TableColumn<Order>[] = [
    { name: "Order ID", selector: (row) => row.orderId, sortable: true },
    { name: "Order Date", selector: (row) => row.orderDate },
    { name: "Ship Date", selector: (row) => row.shipDate },
    { name: "Ship Mode", selector: (row) => row.shipMode },
    { name: "Customer ID", selector: (row) => row.customerId },

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
            onClick={() => setDeleteId(row.orderId)}
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
          <h2 className="font-bold text-gray-800">Orders</h2>
          <button
            onClick={openCreateModal}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Add Order
          </button>
        </div>

        <p className="text-xs mb-4">Order metadata including ship details.</p>

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

      {/* Create/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-120 border border-neutral-300 shadow shadow-black/30">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Order" : "Add Order"}
            </h3>

            {[
              ["orderId", "Order ID"],
              ["orderDate", "Order Date"],
              ["shipDate", "Ship Date"],
              ["shipMode", "Ship Mode"],
              ["customerId", "Customer ID"],
            ].map((key, index) => (
              <div key={index} className="text-sm flex items-center gap-1">
                <label htmlFor={key[0]} className="w-50 text-sm">
                  {key[1]}
                </label>
                <input
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

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded shadow w-80">
            <h3 className="font-semibold mb-4 text-red-600">Delete Order?</h3>

            <p className="text-sm mb-4">
              Are you sure you want to delete order
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
                onClick={confirmDelete}
                className="px-3 py-1 bg-red-600 text-white rounded"
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

export default OrdersTable;
