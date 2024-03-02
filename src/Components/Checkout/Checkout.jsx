import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { Await, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cartId, setItemsNum } = useContext(cartContext);
  const [payOnline, setPayOnline] = useState(false);
  let navigate = useNavigate();
  async function callCheckout(shippingAddress) {
    console.log(shippingAddress);
    try {
      const { data } = await axios.post(
        payOnline
          ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
          : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      setItemsNum(0);
      if (!payOnline) {
        setTimeout(() => {
          navigate("/allorders");
        }, 6000);
      } else {
        window.open(data.session.url, "_self");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid number")
      .required("Phone is required"),
    city: Yup.string()
      .min(2, "City name is too short")
      .max(20, "city name is too long")
      .required("City name is required"),
    details: Yup.string()
      .min(2, "Address is too short")
      .required("Address is required"),
  });

  const checkoutForm = useFormik({
    initialValues: {
      phone: "",
      city: "",
      details: "",
    },
    validationSchema,
    onSubmit: callCheckout,
  });
  return (
    <>
      <div className="container py-5" style={{ height: "550px" }}>
        <form onSubmit={checkoutForm.handleSubmit}>
          <h2 className=" fw-semibold mb-4">Checkout</h2>
          <div className="form-group mb-3">
            <label htmlFor="phone" className=" text-main fw-semibold mb-1">
              Phone
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className=" form-control"
              value={checkoutForm.values.phone}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            />
            {checkoutForm.errors.phone && checkoutForm.touched.phone ? (
              <div className=" alert alert-danger">
                {checkoutForm.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="city" className=" text-main fw-semibold mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              className=" form-control"
              value={checkoutForm.values.city}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            />
            {checkoutForm.errors.city && checkoutForm.touched.city ? (
              <div className=" alert alert-danger">
                {checkoutForm.errors.city}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-3">
            <label htmlFor="details" className=" text-main fw-semibold mb-1">
              Address
            </label>
            <textarea
              name="details"
              id="details"
              className=" form-control"
              value={checkoutForm.values.details}
              onChange={checkoutForm.handleChange}
              onBlur={checkoutForm.handleBlur}
            ></textarea>
            {checkoutForm.errors.details && checkoutForm.touched.details ? (
              <div className=" alert alert-danger">
                {checkoutForm.errors.details}
              </div>
            ) : null}
          </div>
          <input
            type="checkbox"
            name="payOnline"
            id="payOnline"
            className="me-2"
            onClick={() => {
              setPayOnline(!payOnline);
            }}
          />
          <label htmlFor="payOnline" className=" me-4">
            Pay Online
          </label>
          <button
            disabled={!(checkoutForm.dirty && checkoutForm.isValid)}
            className="btn btn-success bg-main fw-semibold"
          >
            {payOnline ? "Pay Online" : "Pay In Cash"}
          </button>
        </form>
      </div>
    </>
  );
}
