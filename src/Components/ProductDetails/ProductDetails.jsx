import React, { useContext, useState } from "react";
import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { Triangle } from "react-loader-spinner";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const [isAdding, setIsAdding] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let { id } = useParams();
  let { addToCart } = useContext(cartContext);
  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  let { isError, isLoading, error, data } = useQuery(
    "productDetails",
    getProductDetails,
    { cacheTime: 0 }
  );
  async function addProductToCart(id) {
    let res = await addToCart(id);
    if (res?.status == "success") {
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

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center w-100 vh-100 py-5">
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
          <div className="row align-items-center gy-5">
            <div className="col-lg-3">
              <Slider {...settings}>
                {data?.data.data.images.map((e, i) => (
                  <img key={i} className="w-100 rounded-1" src={e} alt="" />
                ))}
              </Slider>
            </div>
            <div className="col-lg-9">
              <h2>{data?.data.data.title}</h2>
              <h3 className=" text-muted mb-5">
                {data?.data.data.description}
              </h3>
              <h4 className=" fw-semibold h5">
                {data?.data.data.category.name}
              </h4>
              <div className="d-flex justify-content-between">
                <h4 className=" fw-semibold h6">{data?.data.data.price} EGP</h4>
                <h4 className=" fw-semibold h6">
                  <i className="fas fa-star rating-color me-1"></i>
                  {data?.data.data.ratingsAverage}
                </h4>
              </div>
              <button
                disabled={isAdding}
                onClick={() => {
                  addProductToCart(id);
                }}
                className=" btn btn-success bg-main w-100 text-white"
              >
                <i className="fa-solid fa-plus me-1"></i>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
