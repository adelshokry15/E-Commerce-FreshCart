import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(true);
  let navigate = useNavigate();
  async function forgot(val) {
    setIsLoading(true);
    let req = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    if (req.data.statusMsg == "success") {
      setFormState(false);
      setIsLoading(false);
    }
    console.log(req);
  }
  async function verify(val) {
    setIsLoading(true);
    let req = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
    if (req.data.status == "Success") {
      setIsLoading(false);
      navigate("/updatePassword");
    }
    console.log(req);
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
  });
  const validationSchema2 = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{5,6}$/, "Code must only contain five or six numbers")
      .required("Reset Code is required"),
  });
  const forgotPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgot,
  });
  const verifyForm = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationSchema2,
    onSubmit: verify,
  });
  return (
    <>
      <div className="container py-5">
        {errorMessage ? (
          <div className=" alert alert-danger">{errorMessage}</div>
        ) : null}
        {formState ? (
          <form onSubmit={forgotPasswordForm.handleSubmit} className="forgot">
            <label htmlFor="email" className=" fw-bold text-main mb-2">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className=" mb-3 form-control"
              onChange={forgotPasswordForm.handleChange}
              onBlur={forgotPasswordForm.handleBlur}
              value={forgotPasswordForm.values.email}
            />
            {forgotPasswordForm.errors.email &&
            forgotPasswordForm.touched.email ? (
              <div className=" alert alert-danger">
                {forgotPasswordForm.errors.email}
              </div>
            ) : null}
            <button
              disabled={
                !(
                  forgotPasswordForm.isValid &&
                  forgotPasswordForm.dirty &&
                  !isLoading
                )
              }
              className="btn btn-success bg-main"
            >
              {isLoading ? (
                <i className=" fa fa-spinner fa-spin"></i>
              ) : (
                "Send Reset Code"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyForm.handleSubmit} className="verify">
            <label htmlFor="resetCode" className=" fw-bold text-main mb-2">
              Reset Code
            </label>
            <input
              type="text"
              id="resetCode"
              name="resetCode"
              className=" mb-3 form-control"
              onChange={verifyForm.handleChange}
              onBlur={verifyForm.handleBlur}
              value={verifyForm.values.resetCode}
            />
            {verifyForm.errors.resetCode && verifyForm.touched.resetCode ? (
              <div className=" alert alert-danger">
                {verifyForm.errors.resetCode}
              </div>
            ) : null}
            <button
              disabled={!(verifyForm.isValid && verifyForm.dirty && !isLoading)}
              className="btn btn-success bg-main"
            >
              {isLoading ? (
                <i className=" fa fa-spinner fa-spin"></i>
              ) : (
                "Enter Reset Code"
              )}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
