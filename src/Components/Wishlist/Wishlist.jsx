import React, { useContext, useEffect, useState } from "react";
import styles from "./Wishlist.module.css";
import { wishlistContext } from "../../Context/WishlistContext";
import { date } from "yup";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { Triangle } from "react-loader-spinner";

export default function Wishlist() {
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  let { addToCart } = useContext(cartContext);
  let { addToWishlist, getUserWishlist, removeFromWishlist } =
    useContext(wishlistContext);
  async function showWishlist() {
    let res = await getUserWishlist();
    setWishlistProducts(res?.data);
    setIsLoading(false);
  }
  async function addProductToWishlist(id) {
    let res = await addToWishlist(id);
    if (res?.data.status == "success") {
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      await getWishlist();
    } else {
      toast.error(`Failed`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }
  async function removeProductFromWishlist(id) {
    let res = await removeFromWishlist(id);
    if (res?.data.status == "success") {
      toast.success(`${res.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      await getWishlist();
    } else {
      toast.error(`Failed`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }
  function CheckWishlist(id) {
    if (
      wishlistProducts?.find((w) => {
        return w.id === id;
      })
    ) {
      return true;
    } else {
      return false;
    }
  }
  async function getWishlist() {
    let { data } = await getUserWishlist();
    setWishlistProducts(data);
  }
  async function addProductToCart(id) {
    setIsAdding(true);
    let res = await addToCart(id);
    console.log(res);
    if (res.status == "success") {
      setIsAdding(false);
      toast.success(res.message, {
        theme: "light",
        position: "top-center",
      });
    } else {
      setIsAdding(false);
      toast.error("Failed to add product", {
        theme: "light",
        position: "top-center",
      });
    }
  }
  useEffect(() => {
    showWishlist();
  }, []);
  return (
    <>
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
      ) : wishlistProducts.length ? (
        <div className="container py-5">
          <div className="row">
            {wishlistProducts.map((e) => {
              return (
                <div className="col-md-2" key={e.id}>
                  <div className="product mb-3 p-2 overflow-hidden position-relative">
                    <i
                      onClick={(a) => {
                        if (a.target.classList.contains("fa-regular")) {
                          addProductToWishlist(e.id);
                        } else {
                          removeProductFromWishlist(e.id);
                        }
                      }}
                      className={`fa-${
                        CheckWishlist(e.id) ? "solid" : "regular"
                      } fa-heart position-absolute top-0 end-0 fs-3 text-main cursor-pointer`}
                    ></i>

                    <Link to={`/product-details/${e.id}`}>
                      <img
                        className=" w-100 mb-2"
                        src={e.imageCover}
                        alt={e.title}
                      />
                      <h3 className=" small fw-bolder mb-2 text-main">
                        {e.category.name}
                      </h3>
                      <h3 className="h5 fw-bolder mb-2 text-truncate">
                        {e.title}
                      </h3>
                      <div className="d-flex justify-content-between">
                        <h4 className="h6  ">{e.price} EGP</h4>
                        <h4 className="h6">
                          <i className="fas fa-star rating-color"></i>
                          {e.ratingsAverage}
                        </h4>
                      </div>
                    </Link>
                    <button
                      disabled={isAdding}
                      onClick={() => addProductToCart(e.id)}
                      className="btn btn-success w-100 bg-main"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="container py-5" style={{ height: "600px" }}>
          <h2>
            Your wishlist is empty now,{" "}
            <Link to={"/"} className=" text-main">
              Go Back To Home Page
            </Link>
          </h2>
        </div>
      )}
    </>
  );
}
