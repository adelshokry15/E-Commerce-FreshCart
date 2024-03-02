import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { Helmet } from "react-helmet";
import { cartContext } from "./../../Context/CartContext";
import { tokenContext } from "./../../Context/Token";
import img from "../../assets/images/slider-image-1.jpeg";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, itemsNum, removeFromCart, updateInCart, clearCart } =
    useContext(cartContext);
  let [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getCartDetails() {
    setIsLoading(true);
    const data = await getCart();
    setCartItems(data);
    setIsLoading(false);
  }
  async function clear() {
    let res = await clearCart();
    if (res.message == "success") {
      toast.success("Your cart is cleared successfully", {
        theme: "light",
        position: "top-center",
      });
      await getCartDetails();
    } else {
      toast.error("failed", {
        theme: "light",
        position: "top-center",
      });
    }
  }
  async function removeProduct(id) {
    const data = await removeFromCart(id);

    if (data.status == "success") {
      toast.success("Item is removed from your cart", {
        theme: "light",
        position: "top-center",
      });
      setCartItems(data);
    } else {
      toast.error("Item is not removed from your cart", {
        theme: "light",
        position: "top-center",
      });
    }
  }

  async function updateProduct(id, count) {
    const data = await updateInCart(id, count);
    setCartItems(data);
  }
  useEffect(() => {
    getCartDetails();
  }, []);
  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      {isLoading ? ( // Display loader if loading is true
        <div className=" d-flex justify-content-center align-items-center w-100 py-5 position-absolute start-0 end-0 top-0 bottom-0 bg-white">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#4fa94d"
            secondaryColor="#4fa94d"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : cartItems ? ( // Render cart items if cartItems is not null
        <div className="container bg-main-light my-5 p-5 rounded-1">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {" "}
            <h3 className="fw-semibold">Cart Shop</h3>
            <button onClick={clear} className="btn btn-outline-danger">
              Clear Cart
            </button>
          </div>
          {cartItems && (
            <div className="d-flex justify-content-between mb-5">
              <h4 className="h6 fw-semibold">
                Total Price :{" "}
                <span className="text-main">
                  {cartItems.data?.totalCartPrice}
                </span>
              </h4>
              <h4 className="h6 fw-semibold">
                Total Numbers : <span className="text-main">{itemsNum}</span>
              </h4>
            </div>
          )}
          {cartItems?.data?.products.map((e) => {
            return (
              <div
                key={e.product.id}
                className="row align-items-center border-bottom py-3 my-3 gy-3"
              >
                <div className="col-md-1">
                  <img
                    className="w-100"
                    src={e.product.imageCover}
                    alt={e.product.title}
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="h5 fw-semibold">{e.product.title}</h4>
                  <h5 className="h6 text-main fw-semibold">{e.price} EGP</h5>
                  <button
                    onClick={() => {
                      removeProduct(e?.product?.id);
                    }}
                    className="btn text-danger border-0 fw-semibold"
                  >
                    {" "}
                    <i className="fa fa-trash me-2"></i> Remove
                  </button>
                </div>
                <div className="col-md-2 justify-content-center justify-content-md-end d-flex">
                  <button
                    onClick={() => {
                      updateProduct(e?.product?.id, e.count + 1);
                    }}
                    className="btn btn-outline-success"
                  >
                    {" "}
                    +{" "}
                  </button>
                  <span className="mx-3">{e.count}</span>
                  <button
                    onClick={() => {
                      if (e?.count - 1 > 1) {
                        updateProduct(e?.product?.id, e.count - 1);
                      } else {
                        removeProduct(e?.product?.id);
                      }
                    }}
                    className="btn btn-outline-success"
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
              </div>
            );
          })}
          <Link to={"/checkout"} className="btn w-100 btn-success bg-main">
            Checkout
          </Link>
        </div>
      ) : (
        <div className="container py-5" style={{ height: "600px" }}>
          <h4>
            There are no products in your cart. You can continue shopping from
            here{" "}
            <Link to={"/"} className=" fw-semibold text-main">
              Home
            </Link>
          </h4>
        </div>
      )}
    </>
  );
}
