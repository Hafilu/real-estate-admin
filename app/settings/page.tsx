"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";

const initial = { name: "Admin", email: "admin@example.com", password: "" };
const schema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
});

export default function Settings() {
  return (
    <div className="flex justify-center items-center ">
      <div className="w-full md:w-[60%] lg:w-[40%] bg-white shadow rounded-lg p-6">
        <h1 className="text-lg font-semibold mb-4 text-center">
          Update Profile
        </h1>
        <Formik
          initialValues={initial}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log("profile", values);
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
                type="email"
                name="email"
                label="Email"
                placeholder="Enter Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                error={errors.password}
              />
              <div className="flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
