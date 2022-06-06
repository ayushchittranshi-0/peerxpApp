import React, { useEffect } from "react";
import "./Posts.css";
import { PostPageActions } from "../store";
import { useSelector, useDispatch } from "react-redux";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.DashboardReducer.posts);
  const noMeta = useSelector((state) => state.PostsPageReducer.noMeta);
  const tooLongMeta = useSelector(
    (state) => state.PostsPageReducer.tooLongMeta
  );
  const tooLongUrl = useSelector((state) => state.PostsPageReducer.tooLongUrl);
  const noImg = useSelector((state) => state.PostsPageReducer.noImg);
  const tooShortPosts = useSelector(
    (state) => state.PostsPageReducer.tooShortPosts
  );
  const tooLongPosts = useSelector(
    (state) => state.PostsPageReducer.tooLongPosts
  );

  console.log(
    posts.map((item) => {
      return item.meta_description;
    })
  );

  useEffect(() => {
    let l = posts.length;
    let noMeta = [],
      tooLongMeta = [],
      tooLongUrl = [],
      noImg = [],
      tooLongPosts = [],
      tooShortPosts = [];

    if (l > 0) {
      let i = 0;
      let month;
      while (i < l) {
        if (!posts[i].meta_description) noMeta.push(posts[i]);
        if (posts[i].meta_description && posts[i].meta_description.length > 160)
          tooLongMeta.push(posts[i]);
        if (posts[i].url.length > 100) tooLongUrl.push(posts[i]);
        if (!posts[i].feature_img) noImg.push(posts[i]);
        let htmlString = posts[i].html.replace(/<[^>]+>/g, "");
        let words = htmlString.split(" ").length;
        console.log("words", words);
        if (words < 250) tooShortPosts.push(posts[i]);
        if (words > 1500) tooLongPosts.push(posts[i]);
        i = i + 1;
      }
    }
    dispatch(PostPageActions.assignNoMeta(noMeta));
    dispatch(PostPageActions.assignNoIMG(noImg));
    dispatch(PostPageActions.assignTooLongMeta(tooLongMeta));
    dispatch(PostPageActions.assignTooLongPosts(tooLongPosts));
    dispatch(PostPageActions.assignTooShortPosts(tooShortPosts));
    dispatch(PostPageActions.assignTooLongUrl(tooLongUrl));
  }, [posts]);

  return (
    <div className="posts-page">
      <div className="upper-row">
        <div className="List">
          <h1>Posts Without Meta</h1>
          {noMeta && (
            <ul>
              {noMeta.map((item) => {
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
        <div className="List">
          <h1>Posts With No Featured Image</h1>

          {noImg && (
            <ul>
              {noImg.map((item) => {
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
        <div className="List">
          <h1>Too Short Posts</h1>

          {tooShortPosts && (
            <ul>
              {tooShortPosts.map((item) => {
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
        <div className="List">
          <h1> Too Long Posts</h1>

          {tooLongPosts && (
            <ul>
              {tooLongPosts.map((item) => {
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
      </div>
      <div className="lower-row">
        <div className="List">
          <h1>Posts With Too Long Meta</h1>
          {!tooLongMeta && <p>No Links Found</p>}
          {tooLongMeta && (
            <ul>
              {tooLongMeta.map((item) => {
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
        <div className="List">
          <h1>Posts With Too Long Url</h1>
          {!tooLongMeta && <p>No Links Found</p>}
          {tooLongUrl && (
            <ul>
              {tooLongUrl.map((item) => {
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
      </div>
    </div>
  );
};

export default Posts;
