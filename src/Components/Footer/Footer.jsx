import React from "react";
import styles from "./Footer.module.css";
import img1 from "../../assets/images/amazon pay.png";
import img2 from "../../assets/images/127514-logo-american-express-download-free-image.png";
import img3 from "../../assets/images/mastercard-logo.png";
import img4 from "../../assets/images/paypal-logo.png";
import img5 from "../../assets/images/iphone-app-store-apple-store-img.jpg";
import img6 from "../../assets/images/get it on google play-logo.png";

export default function Footer() {
  return (
    <footer className=" bg-body-tertiary">
      <div className="container py-5">
        <h3>Get The FreshCart App</h3>
        <p className=" mb-3">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="row border-bottom p-3 pb-5 gy-4">
          <div className="col-md-9">
            <input
              type="email"
              placeholder="Email .."
              className=" form-control"
            />
          </div>
          <div className="col-md-3">
            <button className=" w-100 btn btn-success bg-main">
              Share App Link
            </button>
          </div>
        </div>
        <div className="row justify-content-md-between py-4 px-3 gy-5 border-bottom">
          <div className="col-md-5">
            <p className=" d-inline-block me-1 h5">Payment Partners</p>
            <img
              className=" rounded-5"
              width={"60px"}
              height={"50px"}
              src={img1}
              alt=""
            />
            <img
              className=" rounded-5"
              width={"60px"}
              height={"50px"}
              src={img2}
              alt=""
            />
            <img
              className=" rounded-5"
              width={"60px"}
              height={"50px"}
              src={img3}
              alt=""
            />
            <img
              className=" rounded-5"
              width={"60px"}
              height={"50px"}
              src={img4}
              alt=""
            />
          </div>
          <div className="col-md-5">
            <p className=" d-inline-block me-1 h5">
              Get deliveries with FreshCart
            </p>
            <img
              className=" rounded-1 mx-1"
              width={"100px"}
              height={"30px"}
              src={img5}
              alt=""
            />
            <img
              className=" rounded-1"
              width={"100px"}
              height={"30px"}
              src={img6}
              alt=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
