import React, { useEffect } from "react";
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
    version: "v3.0",
  });

  const getdata = async () => {
    dispatch(DashboardActions.assignLoading(true));
    const posts_temp = await api.posts;
    const posts_data = await posts_temp.browse();

    const tags = await api.tags;
    const tags_data = await tags.browse();
    dispatch(DashboardActions.assignTags(tags_data));

    const authors = await api.authors;
    const authors_data = await authors.browse();
    dispatch(DashboardActions.assignAuthors(authors_data));

    const pages = await api.pages;
    const pages_data = await pages.browse();
    dispatch(DashboardActions.assignPages(pages_data));

    const top5_posts = await posts_temp.browse({ limit: 5 });
    dispatch(DashboardActions.assignTop5posts(top5_posts));

    console.log(posts_data);

    dispatch(DashboardActions.assignPosts(posts_data));
    dispatch(DashboardActions.assignLoading(false));
  };

  useEffect(() => {
    getdata();
  }, []);

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
