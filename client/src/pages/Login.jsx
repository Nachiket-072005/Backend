import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Provide valid credentials");
    }
  };
  return (
    <div>
      <Input
        value={user.email}
        name="email"
        onChange={changeHandler}
        type="text"
        placeholder="Email"
      />
      <Input
        value={user.password}
        name="password"
        onChange={changeHandler}
        type="password"
        placeholder="Password"
      />

      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
