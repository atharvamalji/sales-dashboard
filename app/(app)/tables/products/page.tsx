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

  // modal
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // form state
  const [form, setForm] = useState<Partial<Product>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      setData(json);
    } finally {
      setPending(false);
    }
  }

  // open modal for create
  function openCreateModal() {
    setEditing(null);
    setForm({});
    setOpen(true);
  }

  // open modal for edit
  function openEditModal(row: Product) {
    setEditing(row);
    setForm(row);
    setOpen(true);
  }

  // submit create / update
  async function handleSubmit() {
    if (editing) {
      await fetch(`/api/products?productId=${editing.productId}`, {
        method: "PUT",
        body: JSON.stringify(form),
      });
    } else {
      await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(form),
      });
    }

    setOpen(false);
    fetchData();
  }

  // confirm delete
  async function confirmDelete() {
    if (!deleteId) return;

    await fetch(`/api/products?productId=${deleteId}`, {
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

  const columns: TableColumn<Product>[] = [
    { name: "Product ID", selector: (row) => row.productId, sortable: true },
    { name: "Name", selector: (row) => row.productName, sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    {
      name: "Sub Category",
      selector: (row) => row.subCategory,
      sortable: true,
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
            onClick={() => setDeleteId(row.productId)}
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
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-gray-800">Products</h2>

          <button
            onClick={openCreateModal}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            + Add Product
          </button>
        </div>

        <p className="text-xs mb-4">Product catalog with categories.</p>

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

      {/* Create/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded w-120 border border-neutral-300 shadow shadow-black/30">
            <h3 className="font-semibold mb-3">
              {editing ? "Edit Product" : "Add Product"}
            </h3>

            {[
              ["productId", "Product ID"],
              ["productName", "Product Name"],
              ["category", "Category"],
              ["subCategory", "Sub Category"],
            ].map((key) => (
              <div className="text-sm flex items-center gap-1" key={key[0]}>
                <label htmlFor={key[0]} className="w-40 text-sm">
                  {key[1]}
                </label>
                <input
                  placeholder={key[1]}
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
            <h3 className="font-semibold mb-4 text-red-600">Delete Product?</h3>
            <p className="text-sm mb-4">
              Are you sure you want to delete product{" "}
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

export default ProductsTable;
