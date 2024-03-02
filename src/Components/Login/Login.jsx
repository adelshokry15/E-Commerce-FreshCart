import React, { useContext } from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "./../../Context/Token";
import { Helmet } from "react-helmet";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let { setToken, setUserData } = useContext(tokenContext);
  let navigate = useNavigate();
  async function callLogin(reqBody) {
    setIsLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
      .then(({ data }) => {
        if (data.message == "success") {
          localStorage.setItem("userToken", data.token);
          setToken(data.token);
          setUserData(data.user);
          console.log(data?.user);
          localStorage.setItem("userProfile", JSON.stringify(data?.user));

          console.log(localStorage.getItem("userProfile"));
          setIsLoading(false);
          setErrorMessage(null);
          navigate("/");
          localStorage.setItem("userToken", data.token);
          setToken(data.token);
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{6,12}$/,
        "Password must start with an uppercase and only contain range of numbers or characters between 6 to 12"
      )
      .required("Password is required"),
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
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });
  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>

      <div className="w-50 mx-auto my-5" style={{ height: "450px" }}>
        <h2 className=" mb-3">Login Now : </h2>
        {errorMessage ? (
          <div className=" alert alert-danger">{errorMessage}</div>
        ) : null}
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="Email" className=" mb-1">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              className=" form-control"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="alert alert-danger">{loginForm.errors.email}</div>
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
                onChange={loginForm.handleChange}
                value={loginForm.values.password}
                onBlur={loginForm.handleBlur}
              />
              <i
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className={`fa-solid fa-eye${showPassword ? "" : "-slash"}`}
              ></i>
            </div>

            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="alert alert-danger">
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between">
            <Link to={"/forgotPassword"} className="fw-bold">
              Forgot Password ?
            </Link>
            <button
              className="btn btn-success ms-auto d-block"
              disabled={!(loginForm.isValid && loginForm.dirty)}
            >
              {isLoading ? <i className=" fa fa-spinner fa-spin"></i> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
