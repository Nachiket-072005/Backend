import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let { serverUrl, userData, setUserData, getUserData } =
    useContext(dataContext);
  let navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        `${serverUrl}/api/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      await getUserData();
      setUserData(data.user);
      navigate("/");

      console.log("Login successful:", data);
    } catch (error) {
      console.log("Error during login:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-black flex items-center justify-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px] p-4">
        <h1 className="text-white text-[20px] font-semibold">Login</h1>
        <form
          className="w-[100%] flex flex-col items-center justify-center gap-[20px]"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#07c7e4] text-black px-[10px] py-[5px] rounded-lg">
            Login
          </button>

          <p
            className="text-white cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?{" "}
            <span className="text-[#07c7e4] ">Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
