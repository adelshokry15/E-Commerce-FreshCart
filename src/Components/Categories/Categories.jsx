import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Categories() {
  async function getAllCat() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { isLoading, data } = useQuery("allCat", getAllCat, {
    cacheTime: 5000,
  });
  console.log(data?.data);
  return (
    <>
      <Helmet>
        <title>Categories Page</title>
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
        <div className="container py-5">
          <div className="row g-5">
            {data?.data.data.map((c) => {
              return (
                <div key={c._id} className="col-md-3 text-center">
                  <div
                    className={`${styles.catContainer} overflow-hidden position-relative mb-2 rounded-2`}
                  >
                    <img
                      height={"300px"}
                      className=" w-100"
                      src={c.image}
                      alt={c.name}
                    />
                    <div
                      className={`${styles.catLayer} position-absolute start-0 bg-black bg-opacity-50 w-100 h-100`}
                    >
                      <Link
                        to={`/category-details/${c._id}`}
                        className="btn btn-success bg-main position-absolute start-50 top-50 translate-middle"
                      >
                        Shop Category
                      </Link>
                    </div>
                  </div>
                  <h3 className=" text-main">{c.name}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
