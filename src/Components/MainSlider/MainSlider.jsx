import React from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="container my-5">
        <div className="row g-5 g-md-0">
          <div className="col-md-8">
            <Slider {...settings}>
              <img
                className={`w-100 ${styles.imgsMainSlider}`}
                src={img1}
                alt="slide 1"
              />
              <img
                className={`w-100 ${styles.imgsMainSlider}`}
                src={img2}
                alt="slide 2"
              />
              <img
                className={`w-100 ${styles.imgsMainSlider}`}
                src={img3}
                alt="slide 3"
              />
            </Slider>
          </div>
          <div className="col-md-4">
            <img
              className=" w-100"
              style={{ height: "200px" }}
              src={img2}
              alt="slide 2"
            />
            <img
              className=" w-100"
              style={{ height: "200px" }}
              src={img3}
              alt="slide 3"
            />
          </div>
        </div>
      </div>
    </>
  );
}
