import React, { useContext } from "react";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  let { userData, setUserData, getUserData, serverUrl } =
    useContext(dataContext);
  let navigate = useNavigate();
  if (!userData) {
    navigate("/signup");
  }

  const handleLogout = async () => {
    try {
      let data = await axios.post(
        `${serverUrl}/api/logout`,
        {},
        { withCredentials: true }
      );

      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0d1818] flex flex-col items-center justify-center gap-[20px]">
      <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-gray-300 cursor-pointer">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="w-[100%] h-[100%]"
        />
      </div>
      <p className="text-white text-[20px] font-semibold p-4">
        Hey,{" "}
        <span className="text-[#07c7e4] text-[25px]">{userData.firstName}</span>{" "}
        Welcome to Website!
      </p>
      <button
        className="bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
