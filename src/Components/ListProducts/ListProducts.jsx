import React, { useContext, useEffect, useState } from "react";
import styles from "./ListProducts.module.css";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { wishlistContext } from "../../Context/WishlistContext";

export default function ListProducts(props) {
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
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <>
      {props.allProducts.map((p) => {
        return (
          <div className="row align-items-center my-3 border-bottom" key={p.id}>
            <div className="col-md-3 py-2 position-relative">
              <img
                className=" w-100 rounded-1 mb-2"
                src={p.imageCover}
                alt={p.title}
              />
              <i
                onClick={(a) => {
                  if (a.target.classList.contains("fa-regular")) {
                    addProductToWishlist(p.id);
                  } else {
                    removeProductFromWishlist(p.id);
                  }
                }}
                className={`fa-${
                  CheckWishlist(p.id) ? "solid" : "regular"
                } fa-heart position-absolute top-0 end-0 fs-3 text-main cursor-pointer`}
              ></i>
            </div>
            <div className=" offset-md-1 col-md-8">
              <h3 className=" text-main">{p.category.name}</h3>
              <h3>{p.title}</h3>
              <p className=" mb-4">{p.description}</p>
              <div className="d-flex justify-content-between mb-4">
                <h5>{p.price} EGP</h5>
                <h5>
                  <i className="fas fa-star rating-color me-1"></i>
                  {p.ratingsAverage}
                </h5>
              </div>
              <Link
                to={`/product-details/${p.id}`}
                className=" btn bg-main btn-success text-white mb-3"
              >
                Details
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
