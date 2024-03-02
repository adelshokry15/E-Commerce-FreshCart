import React, { useContext, useEffect } from "react";
import styles from "./NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/Token";
import { cartContext } from "../../Context/CartContext";
import logo from "../../assets/images/freshcart-logo.svg";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  let { token, setToken } = useContext(tokenContext);
  let { itemsNum, getCart, clearCart } = useContext(cartContext);
  let navigate = useNavigate();
  const location = useLocation();

  // Custom function to determine if the link is active
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("usertoken")) {
        setToken(null);
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 z-3">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="freshcart-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/products") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/products"}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/categories") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/categories"}
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/brands") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/brands"}
                  >
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      isActiveLink("/wishlist") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/wishlist"}
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            ) : null}
            <ul className="ms-auto navbar-nav">
              {token ? (
                <li className="nav-item me-3">
                  <Link
                    className={`nav-link position-relative ${
                      isActiveLink("/cart") ? styles.active : ""
                    }`}
                    aria-current="page"
                    to={"/cart"}
                  >
                    <i className="fa-solid fa-cart-shopping fs-2"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                      {itemsNum}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
              ) : null}

              {token ? (
                <>
                  <li className="nav-item">
                    <button onClick={logOut} className="nav-link">
                      Logout
                    </button>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        isActiveLink("/profile") ? styles.active : ""
                      }`}
                      aria-current="page"
                      to={"/profile"}
                    >
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        isActiveLink("/register") ? styles.active : ""
                      }`}
                      aria-current="page"
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${
                        isActiveLink("/login") ? styles.active : ""
                      }`}
                      aria-current="page"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
