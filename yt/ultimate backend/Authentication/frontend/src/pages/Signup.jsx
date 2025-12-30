import React, { useContext, useRef, useState } from "react";
import dp from "../assets/profile.jpeg";
import { dataContext } from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  let { serverUrl, userData, setUserData, getUserData } =
    useContext(dataContext);
  let navigate = useNavigate();
  let file = useRef(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (backendImage) {
        formData.append("profileImage", backendImage);
      }
      let { data } = await axios.post(`${serverUrl}/api/signup`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await getUserData();
      setUserData(data.user);
      navigate("/");

      console.log("Signup successful:", data);
    } catch (error) {
      console.log("Error during signup:", error);
      alert(error.response.data.message);
    }
  };

  let [frontendImage, setFrontendImage] = useState(dp);
  let [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    let image = URL.createObjectURL(file);
    setFrontendImage(image);
  };

  return (
    <div className="w-full h-[100vh] bg-black flex items-center justify-center">
      <div className="w-[90%] max-w-[500px] h-[600px] bg-[#141f1f] rounded flex flex-col justify-center items-center gap-[20px] p-4">
        <h1 className="text-white text-[20px] font-semibold">Sign Up</h1>
        <form
          className="w-[100%] flex flex-col items-center justify-center gap-[20px]"
          onSubmit={handleSignUp}
        >
          <input type="file" hidden ref={file} onChange={handleImage} />
          <div className="w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-gray-300 cursor-pointer">
            <img
              src={frontendImage}
              alt="Profile"
              className="w-[100%] h-[100%]"
            />
            <div
              className="absolute w-[100%] h-[100%] bg-black top-0 opacity-0 hover:opacity-50 flex items-center justify-center text-white text-[30px] font-bold cursor-pointer"
              onClick={() => {
                file.current.click();
              }}
            >
              +
            </div>
          </div>
          <div className="w-[80%] h-[50px] flex justify-center items-center gap-[10px]">
            <input
              type="text"
              placeholder="First Name"
              className="w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-[50%] h-[100%] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-[80%] h-[50px] bg-white outline-none border-none rounded-lg px-[10px] py-[5px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
            Sign Up
          </button>

          <p
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-[#07c7e4] ">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
