import React, { useContext, useEffect, useState } from "react";
import styles from "./Brands.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../Context/WishlistContext";
import { Bounce, toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";

export default function Categories() {
  const [allProd, setAllProd] = useState([]);
  const [brandsProd, setBrandsProd] = useState([]);
  let { addToCart } = useContext(cartContext);
  const [isAdding, setIsAdding] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  let { addToWishlist, getUserWishlist, removeFromWishlist } =
    useContext(wishlistContext);

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
  async function getAllProd() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setAllProd(data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { isLoading, data } = useQuery("allCat", getAllBrands, {
    cacheTime: 5000,
  });
  useEffect(() => {
    getAllProd();
    getWishlist();
  }, []);
  useEffect(() => {
    setBrandsProd(allProd ? allProd : []);
  }, [allProd]);
  return (
    <>
      <Helmet>
        <title>Brands Page</title>
      </Helmet>
      {isLoading ? (
        <div className=" bg-white position-absolute start-0 end-0 top-0 bottom-0 d-flex justify-content-center align-items-center">
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
        <div className="container position-relative py-1">
          <div className="row gy-5">
            <div className="col-md-4">
              <aside
                className={`${styles.aside} position-sticky top-0 start-0 p-5 overflow-y-scroll`}
              >
                <ul className=" list-unstyled">
                  <li
                    onClick={(e) => {
                      document.querySelectorAll(".lis").forEach((l) => {
                        l.classList.remove("bg-main");
                      });
                      e.target.classList.add("bg-main");
                      setBrandsProd(allProd);
                    }}
                    className="lis bg-main rounded-5 px-4 py-2 cursor-pointer fw-bold"
                  >
                    All Brands
                  </li>
                  {data?.data?.data.map((l) => {
                    return (
                      <li
                        onClick={(e) => {
                          document.querySelectorAll(".lis").forEach((l) => {
                            l.classList.remove("bg-main");
                          });
                          e.target.classList.add("bg-main");
                          setBrandsProd(
                            allProd.filter((p) => {
                              return p.brand.name == e.target.textContent;
                            })
                          );
                          console.log(brandsProd);
                        }}
                        key={l._id}
                        className="lis fw-bold my-1 px-4 py-2 cursor-pointer rounded-5"
                      >
                        {l.name}
                      </li>
                    );
                  })}
                </ul>
              </aside>
            </div>
            <div className="col-md-8">
              {brandsProd.length ? (
                <div className="row">
                  {brandsProd?.map((e) => {
                    return (
                      <div className="col-md-6 col-lg-4" key={e.id}>
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
              ) : (
                <div className=" py-3">
                  <h2>
                    This brand doesn't contain any products now, pick another
                    brand
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
