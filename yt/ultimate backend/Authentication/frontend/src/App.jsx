import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { dataContext } from "./context/UserContext";

function App() {
  const { userData, setUserData } = useContext(dataContext);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={userData ? <Home /> : <Login />} />
    </Routes>
  );
}

export default App;
