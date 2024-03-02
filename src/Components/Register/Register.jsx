import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  async function callRegister(reqBody) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .then(({ data }) => {
        if (data.message == "success") {
          setIsLoading(false);
          setErrorMessage(null);
          navigate("/login");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(10, "Name is too long")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must start with an uppercase and only contain range of numbers or characters between 6 to 12"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword should match")
      .required("RePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid number")
      .required("Phone is required"),
  });
  // function validate(values) {
  //   const errors = {};
  //   if (!values.name) {
  //     errors.name = "Required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name Is Too Short";
  //   }
  //   if (!values.email) {
  //     errors.email = "Required";
  //   } else if (
  //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //   ) {
  //     errors.email = "Invalid email address";
  //   }
  //   if (!values.password) {
  //     errors.password = "Required";
  //   } else if (!/^[A-Z][a-z0-9]{3,5}$/.test(values.password)) {
  //     errors.password = "Invalid Password";
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword = "Required";
  //   } else if (values.password != values.rePassword) {
  //     errors.password = "Password And RePasword Should Match";
  //   }
  //   if (!values.phone) {
  //     errors.phone = "Required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "Phone Is Not Valid";
  //   }
  //   return errors;
  // }
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });
  return (
    <>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className=" mb-3">Register Now : </h2>
        {errorMessage ? (
          <div className=" alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className=" mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              className=" form-control"
              onChange={registerForm.handleChange}
              value={registerForm.values.name}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert alert-danger">
                {registerForm.errors.name}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="Email" className=" mb-1">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              className=" form-control"
              onChange={registerForm.handleChange}
              value={registerForm.values.email}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="Password" className=" mb-1">
              Password
            </label>
            <div className={`${styles.passwordFlag} position-relative`}>
              <input
                type={showPassword ? "text" : "password"}
                id="Password"
                name="password"
                className=" form-control"
                onChange={registerForm.handleChange}
                value={registerForm.values.password}
                onBlur={registerForm.handleBlur}
              />
              <i
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`fa-solid fa-eye${showPassword ? "" : "-slash"}`}
              ></i>
            </div>
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="RePassword" className=" mb-1">
              RePassword
            </label>
            <div className={`${styles.passwordFlag} position-relative`}>
              <input
                type={showPassword ? "text" : "password"}
                id="RePassword"
                name="rePassword"
                className=" form-control"
                onChange={registerForm.handleChange}
                value={registerForm.values.rePassword}
                onBlur={registerForm.handleBlur}
              />
              <i
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`fa-solid fa-eye${showPassword ? "" : "-slash"}`}
              ></i>
            </div>
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="Phone" className=" mb-1">
              Phone
            </label>
            <input
              type="phone"
              id="Phone"
              name="phone"
              className=" form-control"
              onChange={registerForm.handleChange}
              value={registerForm.values.phone}
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger">
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>
          <button
            className="btn btn-success ms-auto d-block"
            disabled={!(registerForm.isValid && registerForm.dirty)}
          >
            {isLoading ? (
              <i className=" fa fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
