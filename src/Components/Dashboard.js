import React, { useEffect, useState } from "react";

import GhostContentAPI from "@tryghost/content-api";
import "./Dashboard.css";
import { useSelector, useDispatch } from "react-redux";
import { DashboardActions } from "../store/index.js";
import BarChart from "./BarChart";

const DashBoard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.DashboardReducer.posts);
  const posts5 = useSelector((state) => state.DashboardReducer.top5post);
  const authors = useSelector((state) => state.DashboardReducer.authors);
  const tags = useSelector((state) => state.DashboardReducer.tags);
  const pages = useSelector((state) => state.DashboardReducer.pages);

  const api = new GhostContentAPI({
    url: process.env.REACT_APP_API_URL,
    key: process.env.REACT_APP_API_KEY,
    version: "v5.0",
  });

  const getdata = async () => {
    setLoading(true);
    const tags = await api.tags;
    const tags_data = await tags.browse();
    dispatch(DashboardActions.assignTags(tags_data));

    const authors = await api.authors;
    const authors_data = await authors.browse();
    dispatch(DashboardActions.assignAuthors(authors_data));

    const pages = await api.pages;
    const pages_data = await pages.browse();
    dispatch(DashboardActions.assignPages(pages_data));

    const posts_temp = await api.posts;
    const posts_data = await posts_temp.browse();
    const top5_posts = await posts_temp.browse({ limit: 5 });
    dispatch(DashboardActions.assignTop5posts(top5_posts));

    console.log(posts_data);
    setLoading(false);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="upper-row">
        <div>
          <h1>Total No of Posts</h1>
          {posts && <h2>{posts.length}</h2>}
        </div>
        <div>
          <h1>Total No of Authors</h1>
          {authors && <h2>{authors.length}</h2>}
        </div>
        <div>
          <h1>Total No of Tags</h1>
          {tags && <h2>{tags.length}</h2>}
        </div>
        <div>
          <h1>Total No of Pages</h1>
          {pages && <h2>{pages.length}</h2>}
        </div>
      </div>

      <div className="lower-row">
        <div className="ListD">
          <h1>Last 5 Posts</h1>
          {posts5 && (
            <ul>
              {posts5.map((item) => {
                return (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="chart">
          {" "}
          {!loading && posts && <BarChart posts={posts}></BarChart>}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
