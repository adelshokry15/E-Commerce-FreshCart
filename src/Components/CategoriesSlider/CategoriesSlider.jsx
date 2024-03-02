import React, { useEffect, useState } from "react";
import styles from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data?.data);
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h2>Shop Popular Categories</h2>
        <Slider {...settings}>
          {categories.map((e) => (
            <div className="item px-1" key={e._id}>
              <img
                className="w-100"
                height={"200px"}
                src={e.image}
                alt={e.name}
              />
              <h5>{e.name}</h5>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
