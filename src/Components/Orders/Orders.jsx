import React, { useContext, useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { tokenContext } from "../../Context/Token";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Orders() {
  let { userId } = useContext(tokenContext);
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getUserOrders(userId) {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserOrders(userId);
  }, [userId]);

  return (
    <>
      <div className="container py-5">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center w-100 py-5 position-absolute start-0 end-0 top-0 bottom-0 bg-white">
            <Triangle
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : orders ? (
          orders?.map((e) => {
            return (
              <div key={e.id} className=" bg-body-tertiary p-4 border-bottom">
                <h3 className=" text-main fw-semibold mb-3 h4">
                  Order Date :{" "}
                  <span className=" text-black h4">
                    {e.createdAt.split("T", 1)}
                  </span>
                </h3>
                <h3 className=" text-main fw-semibold mb-3 h4">
                  Total Order Price :{" "}
                  <span className=" text-black h4">
                    {e.totalOrderPrice} EGP
                  </span>
                </h3>
                <h4 className=" text-main fw-semibold mb-5">
                  Is Paid :{" "}
                  {e.isPaid ? (
                    <i className="fa-solid fa-check text-black"></i>
                  ) : (
                    <i className="fa-solid fa-xmark text-danger"></i>
                  )}
                </h4>
                <div className="row">
                  {e.cartItems.map((c) => {
                    return (
                      <div key={c.product.id} className="col-md-3">
                        <img
                          className=" w-100 mb-2 rounded-1"
                          src={c.product.imageCover}
                          alt={c.product.title}
                        />
                        <h4 className=" text-main">
                          {c.product.category.name}
                        </h4>
                        <h4 className=" text-truncate">{c.product.title}</h4>
                        <div className=" d-flex justify-content-between p-1">
                          <h5>
                            Price :{" "}
                            <span className=" text-black">{c.price}</span>
                          </h5>
                          <h5>
                            Count :{" "}
                            <span className=" text-black">{c.count}</span>
                          </h5>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ height: "600px" }}>
            <h2>
              You didn't order any product until now,{" "}
              <Link className=" text-main" to={"/products"}>
                Go To Products Page
              </Link>
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
