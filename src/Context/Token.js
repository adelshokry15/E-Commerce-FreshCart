import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let tokenContext = createContext();
export default function TokenContextProvider({ children }) {
  let [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const { id } = jwtDecode(localStorage.getItem("userToken"));
      setUserId(id);
      setToken(token);
    }
  }, []);
  return (
    <tokenContext.Provider
      value={{ token, setToken, userId, setUserData, userData }}
    >
      {children}
    </tokenContext.Provider>
  );
}
