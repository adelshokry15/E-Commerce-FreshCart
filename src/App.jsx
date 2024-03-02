import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayOut from "./Components/LayOut/LayOut";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import { useContext, useEffect } from "react";
import TokenContextProvider, { tokenContext } from "./Context/Token";
import ProtectedRouts from "./Components/protectedRouts/ProtectedRouts";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import Checkout from "./Components/Checkout/Checkout";
import Orders from "./Components/Orders/Orders";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import WishlistContextProvider from "./Context/WishlistContext";
import Wishlist from "./Components/Wishlist/Wishlist";
import Profile from "./Components/Profile/Profile";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          index: true,
          path: "/",
          element: (
            <ProtectedRouts>
              <Home />
            </ProtectedRouts>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRouts>
              <Products />
            </ProtectedRouts>
          ),
        },
        {
          path: "/product-details/:id",
          element: (
            <ProtectedRouts>
              <ProductDetails />
            </ProtectedRouts>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRouts>
              <Categories />
            </ProtectedRouts>
          ),
        },
        {
          path: "/category-details/:id",
          element: (
            <ProtectedRouts>
              <CategoryDetails />
            </ProtectedRouts>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRouts>
              <Brands />
            </ProtectedRouts>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <ProtectedRouts>
              <Wishlist />
            </ProtectedRouts>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRouts>
              <Checkout />
            </ProtectedRouts>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRouts>
              <Orders />
            </ProtectedRouts>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRouts>
              <Cart />
            </ProtectedRouts>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRouts>
              <Profile />
            </ProtectedRouts>
          ),
        },

        {
          path: "/login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "/forgotPassword",
          element: (
            <ProtectedAuth>
              <ForgotPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "/updatePassword",
          element: (
            <ProtectedAuth>
              <UpdatePassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routes}></RouterProvider>
        </WishlistContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;
