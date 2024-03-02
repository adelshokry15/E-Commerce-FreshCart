import React from "react";
import styles from "./NotFound.module.css";
import { Helmet } from "react-helmet";
import notFound from "../../assets/images/error.svg";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h2>
        <div style={{ height: "600px" }} className=" text-center py-5">
          <img className=" img-fluid" src={notFound} alt="" />
        </div>
      </h2>
    </>
  );
}
