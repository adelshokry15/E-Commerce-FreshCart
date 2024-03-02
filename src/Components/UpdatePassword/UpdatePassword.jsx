import React, { useState } from "react";
import styles from "./UpdatePassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  async function update(val) {
    try {
      setIsLoading(true);
      let data = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        val
      );
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must start with an uppercase and only contain range of numbers or characters between 6 to 12"
      )
      .required("Password is required"),
  });
  let updatePasswordFormik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: update,
  });
  return (
    <>
      <div className="container py-5">
        {errorMessage ? (
          <div className=" alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={updatePasswordFormik.handleSubmit}>
          <label htmlFor="email" className=" fw-bold text-main mb-2">
            Enter Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className=" form-control mb-3"
            value={updatePasswordFormik.values.email}
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
          />
          {updatePasswordFormik.errors.email &&
          updatePasswordFormik.touched.email ? (
            <div className=" alert alert-danger">
              {updatePasswordFormik.errors.email}
            </div>
          ) : null}
          <label htmlFor="newPassword" className=" fw-bold text-main mb-2">
            Enter Your New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className=" form-control mb-3"
            value={updatePasswordFormik.values.newPassword}
            onChange={updatePasswordFormik.handleChange}
            onBlur={updatePasswordFormik.handleBlur}
          />
          {updatePasswordFormik.errors.newPassword &&
          updatePasswordFormik.touched.newPassword ? (
            <div className=" alert alert-danger">
              {updatePasswordFormik.errors.newPassword}
            </div>
          ) : null}
          <button
            disabled={
              !(
                updatePasswordFormik.isValid &&
                updatePasswordFormik.dirty &&
                !isLoading
              )
            }
            className="btn btn-success bg-main ms-auto"
          >
            {isLoading ? (
              <i className=" fa fa-spinner fa-spin"></i>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
