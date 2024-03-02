import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { tokenContext } from "./Token";
import { date } from "yup";

export const cartContext = createContext();
export default function CartContextProvider({ children }) {
  const [itemsNum, setItemsNum] = useState(0);
  let { token } = useContext(tokenContext);
  const [cartId, setCartId] = useState(null);

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setItemsNum(data.numOfCartItems);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async function getCart() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      setCartId(data?.data._id);
      setItemsNum(data?.numOfCartItems);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async function removeFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setItemsNum(data.numOfCartItems);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
  async function updateInCart(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
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
  async function clearCart() {
    try {
      let { data } = await axios.delete(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      setItemsNum(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <cartContext.Provider
      value={{
        addToCart,
        itemsNum,
        getCart,
        removeFromCart,
        updateInCart,
        cartId,
        setItemsNum,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
