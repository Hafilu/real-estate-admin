"use client";
import React, { useMemo, useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Table from "@/components/Table";
import { agents as agentData } from "@/lib/data";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";

const initial = { name: "", email: "", phone: "", role: "" };
const schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

export default function Agents() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [agents, setAgents] = useState(agentData);

  // Debounce search input
  const debouncedSearch = useDebounce(search, 300);

  // Filter agents
  const filteredAgents = useMemo(() => {
    return agents.filter((a) =>
      [a.name, a.email, a.phone, a.role]
        .join(" ")
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );
  }, [agents, debouncedSearch]);

  return (
    <div className="space-y-4">
      {/* Search + Add Agent Button Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Field */}
        <input
          type="text"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 border border-gray-300 bg-white shadow text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />

        {/* Add Agent Button */}
        <Button
          onClick={() => setOpen(true)}
          className="bg-white shadow !rounded-full flex items-center gap-2 px-4 py-2"
        >
          <Image src="/add-icon.svg" alt="Add" width={20} height={20} />
          Add New Agent
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={["name", "email", "phone", "role"]}
        data={filteredAgents}
      />

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)} title="Add Agent">
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log("agent", values);
            setAgents((prev) => [...prev, values]);
            setOpen(false);
          }}
        >
          {({ values, errors, handleChange }) => (
            <Form className="space-y-3">
              <Input
                name="name"
                label="Name"
                placeholder="Enter Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                name="email"
                label="Email"
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                name="phone"
                label="Phone"
                placeholder="Enter Phone"
                value={values.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <Input
                name="role"
                label="Role"
                placeholder="Enter Role"
                value={values.role}
                onChange={handleChange}
                error={errors.role}
              />
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
