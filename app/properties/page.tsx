"use client";
import React, { useMemo, useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { properties as propData } from "@/lib/data";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";

const initial = {
  title: "",
  location: "",
  price: "",
  status: "Available",
  description: "",
};
const schema = Yup.object().shape({
  title: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  price: Yup.number().typeError("Must be a number").required("Required"),
  status: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

export default function Properties() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState(propData);

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300);

  // Filter function
  const filteredProperties = useMemo(() => {
    return properties.filter((a) =>
      [a.title, a.location, a.price, a.description]
        .join(" ")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [debouncedSearch, properties]);

  return (
    <div className="space-y-4">
      {/* Search + Add  Button Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 bg-white shadow text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* Add Properties Button */}
        <Button
          onClick={() => setOpen(true)}
          className="bg-white shadow !rounded-full flex items-center gap-2 px-4 py-2"
        >
          <Image src="/add-icon.svg" alt="Add" width={20} height={20} />
          Add New Properties
        </Button>
      </div>
      {/* Table */}
      <Table
        columns={["title", "location", "price", "status"]}
        data={filteredProperties}
      />
      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Add Property">
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log("property", values);
            setProperties((prev) => [...prev, values]);
            setOpen(false);
          }}
        >
          {({ values, errors, handleChange }) => (
            <Form className="space-y-3">
              <Input
                name="title"
                label="Title"
                placeholder="Enter title"
                value={values.title}
                onChange={handleChange}
                error={errors.title}
              />
              <Input
                name="location"
                label="Location"
                placeholder="Enter Location"
                value={values.location}
                onChange={handleChange}
                error={errors.location}
              />
              <Input
                name="price"
                label="Price"
                placeholder="Enter Price"
                value={values.price}
                onChange={handleChange}
                error={errors.price}
              />
              <label className="block">
                <div className="mb-1 text-sm font-medium">Status</div>
                <select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                    errors.status ? "border-red-500" : "border-gray-200"
                  }`}
                >
                  <option>Available</option>
                  <option>Sold</option>
                  <option>Pending</option>
                </select>
              </label>
              <label className="block">
                <div className="mb-1 text-sm font-medium">Description</div>
                <textarea
                  name="description"
                  placeholder="Enter description"
                  value={values.description}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.description && (
                  <div className="text-xs text-red-600">
                    {errors.description}
                  </div>
                )}
              </label>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="bg-gray-200 hover:bg-white text-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}
