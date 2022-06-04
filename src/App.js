import React from "react";
import GhostContentAPI from "@tryghost/content-api";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import Posts from "./Components/Posts";
import Links from "./Components/Links";
import { DashboardActions } from "./store/index";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const api = new GhostContentAPI({
    url: process.env.REACT_APP_API_URL,
    key: process.env.REACT_APP_API_KEY,
    version: "v5.0",
  });

  const getdata = async () => {
    const posts_temp = await api.posts;
    const posts_data = await posts_temp.browse();
    dispatch(DashboardActions.assignPosts(posts_data));
  };

  getdata();

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </div>
  );
}

export default App;
