import React, { useEffect } from "react";
import styles from "./Products.module.css";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import GridProducts from "./../GridProducts/GridProducts";
import ListProducts from "./../ListProducts/ListProducts";
import { Triangle } from "react-loader-spinner";

export default function Products() {
  const [isGrid, setIsGrid] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getAllProducts() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      setAllProducts(data?.data);
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
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
          <div className=" d-flex justify-content-center align-content-center mb-5">
            <button
              onClick={() => {
                setIsGrid(true);
              }}
              className={`border-0 p-x2 rounded-2 mx-1 ${
                isGrid ? "bg-main" : "bg-white"
              }`}
            >
              <i
                className={`fa-solid fa-grip ${
                  isGrid ? "text-white" : "text-main"
                }`}
              ></i>
            </button>
            <button
              onClick={() => {
                setIsGrid(false);
              }}
              className={`border-0 p-x2 rounded-2 mx-1 ${
                isGrid ? "bg-white" : "bg-main"
              }`}
            >
              <i
                className={`fa-solid fa-bars ${
                  isGrid ? "text-main" : "text-white"
                }`}
              ></i>
            </button>
          </div>
          {isGrid ? (
            <GridProducts allProducts={allProducts} />
          ) : (
            <ListProducts allProducts={allProducts} />
          )}
        </div>
      )}
    </>
  );
}
