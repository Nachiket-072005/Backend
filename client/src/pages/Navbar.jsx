import { Button } from "@/components/ui/button";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-600">
      <div className="flex items-center justify-between mx-auto p-4">
        <h1 className="font-bold text-lg text-white">{"Nachiket's Bar"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
