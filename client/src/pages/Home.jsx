import React from "react";
import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const todoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setDescription("");
        setTitle("");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex items-center gap-5 mt-5 mx-auto p-4">
          <div className="w-full flex items-center justify-center gap-5">
            <Input
              type="text"
              placeholder="Enter your task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-1/4 mt-2 "
            />
            <Textarea
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-1/2 mt-2"
            />
          </div>
        </div>
        <Button onClick={todoHandler}>Add Task</Button>
      </div>
    </div>
  );
};

export default Home;
