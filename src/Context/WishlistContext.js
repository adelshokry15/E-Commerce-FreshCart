import axios from "axios";
import React, { createContext } from "react";

export const wishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  async function addToWishlist(id) {
    try {
      let data = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log("a");
      console.log(error);
    }
  }
  async function getUserWishlist() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFromWishlist(id) {
    try {
      let data = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <wishlistContext.Provider
      value={{ addToWishlist, getUserWishlist, removeFromWishlist }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
