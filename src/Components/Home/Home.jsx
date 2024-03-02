import React, { useContext } from "react";
import styles from "./Home.module.css";
import { counterContext } from "../../Context/Context";
import MainSlider from "../MainSlider/MainSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Helmet } from "react-helmet";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeaturedProducts />
    </>
  );
}
