import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const dataContext = createContext();

function UserContext({ children }) {
  let [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const serverUrl = "http://localhost:8000";

  const getUserData = async () => {
    try {
      let { data } = await axios.get(`${serverUrl}/api/getuser`, {
        withCredentials: true,
      });
      setUserData(data.user);
    } catch (error) {
      navigate("/login");
      console.log("Error fetching user data:", error);
    }
  };
  const value = {
    serverUrl,
    userData,
    setUserData,
    getUserData,
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
}

export default UserContext;
