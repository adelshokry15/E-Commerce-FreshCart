import React, { useContext } from "react";
import styles from "./Profile.module.css";
import { tokenContext } from "../../Context/Token";
import { useEffect } from "react";

export default function Profile() {
  const { userData, setUserData } = useContext(tokenContext);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userProfile")));
  }, []);
  return (
    <>
      <div className="container py-5" style={{ height: "600px" }}>
        <div className="row">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-user display-1 align-middle"></i>
          </div>
          <div className="col-md-8">
            <ul className=" list-unstyled">
              <li className=" p-3 border-bottom fs-2">
                Name : {userData?.["name"]}
              </li>
              <li className=" p-3 border-bottom fs-2">
                Email : {userData?.email}
              </li>
              <li className=" p-3 border-bottom fs-2">
                Role : {userData?.role}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
