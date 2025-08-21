"use client";
import React, { useState } from "react";

type TableProps<T extends Record<string, unknown>> = {
  columns: (keyof T)[]; // <-- safer typing
  data: T[];
  defaultItemsPerPage?: number;
};

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  defaultItemsPerPage = 5,
}: TableProps<T>) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const currentData = data.slice(start, start + itemsPerPage);

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto max-h-[calc(100vh-230px)] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-100 sticky top-0 z-10">
            <tr>
              <th className="p-3 text-sm text-gray-600 w-[80px]">Sl No</th>
              {columns.map((c) => (
                <th key={String(c)} className="p-3 text-sm capitalize text-gray-600">
                  {String(c)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((row, idx) => (
              <tr key={idx} className={idx % 2 ? "bg-gray-100" : ""}>
                <td className="p-3 text-sm w-[80px]">{start + idx + 1}</td>
                {columns.map((c, i) => (
                  <td key={i} className="p-3 text-sm">
                    {String(row[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination + Items per page */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2">
          <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
            Items per page:
          </label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-600">
          Page {page} of {totalPages} — Showing {currentData.length} of{" "}
          {data.length} items
        </p>

        <div className="flex gap-2">
          <button
            className="btn-pagination"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            {"<<"}
          </button>
          <button
            className="btn-pagination"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            {"<"}
          </button>
          <span className="btn-pagination">{page}</span>
          <button
            className="btn-pagination"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            {">"}
          </button>
          <button
            className="btn-pagination"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            {">>"}
          </button>
        </div>
      </div>
    </div>
  );
}
