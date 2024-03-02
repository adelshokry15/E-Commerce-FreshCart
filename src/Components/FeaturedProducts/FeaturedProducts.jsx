import React, { useContext, useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import img from "../../assets/images/blog-img-1.jpeg";
import axios from "axios";
import { useQuery } from "react-query";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { Bounce, toast } from "react-toastify";
import { wishlistContext } from "../../Context/WishlistContext";
import Checkout from "../Checkout/Checkout";

export default function FeaturedProducts() {
  const [isAdding, setIsAdding] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  let { addToCart } = useContext(cartContext);
  let { addToWishlist, getUserWishlist, removeFromWishlist } =
    useContext(wishlistContext);
  async function getFeaturedProducts() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading, isError, data } = useQuery(
    "featuredProducts",
    getFeaturedProducts,
    {
      cacheTime: 3000,
    }
  );
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
    getWishlist();
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
      ) : (
        <div className="container py-5">
          <h2 className=" text-center mb-3">Featured Products</h2>
          <div className="row gy-5 justify-content-center">
            {data?.data.data &&
              data?.data.data.slice(0, 4).map((e) => (
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
              ))}
          </div>
          <Link
            to={"products"}
            className=" mx-auto d-block btn btn-success bg-main"
          >
            All Products
          </Link>
        </div>
      )}
    </>
  );
}
