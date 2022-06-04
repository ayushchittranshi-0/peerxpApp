import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkPageActions } from "../store";
import $ from "jquery";
import "./Links.css";

const Links = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.DashboardReducer.posts);
  const urls = useSelector((state) => state.LinksPageReducer.urls);
  const lengthInternalLinks = useSelector(
    (state) => state.LinksPageReducer.lengthInternalLinks
  );
  const brokenLinks = useSelector(
    (state) => state.LinksPageReducer.brokenLinks
  );

  console.log(urls);

  // function UrlExists(url, cb) {
  //   $.ajax({
  //     url: url,
  //     dataType: "text",
  //     type: "GET",
  //     complete: function (xhr) {
  //       if (typeof cb === "function") cb.apply(this, [xhr.status]);
  //     },
  //   });
  // }

  const findLinks = (Htmlstr) => {
    var rawHTML = Htmlstr;

    var doc = document.createElement("html");
    doc.innerHTML = rawHTML;
    var links = doc.getElementsByTagName("a");
    var urls = [[], 0];

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href")[0] !== "#")
        urls[0].push(links[i].getAttribute("href"));

      if (
        links[i].getAttribute("href").substring(0, 21) ===
        "https://demo.ghost.io"
      )
        urls[1] = urls[1] + 1;
    }
    return urls;
  };

  useEffect(() => {
    if (urls.length === 0) {
      let tempUrl = [];
      let tempLenInternalLinks = 0;
      let l = posts.length;

      if (l > 0) {
        let i = 0;
        while (i < l) {
          tempUrl = [...tempUrl, ...findLinks(posts[i].html)[0]];
          tempLenInternalLinks =
            tempLenInternalLinks + findLinks(posts[i].html)[1];
          i = i + 1;
        }
      }
      dispatch(LinkPageActions.assignUrls(tempUrl));
      dispatch(LinkPageActions.assignLengthInternalLinks(tempLenInternalLinks));
    }
  }, [posts]);

  // useEffect(() => {
  //   let tempBroken = [];
  //   let l = urls.length;

  //   if (l > 0) {
  //     let i = 0;
  //     while (i < l) {
  //       UrlExists(urls[i]);
  //       i = i + 1;
  //     }
  //   }
  // }, [urls]);

  return (
    <div className="Container">
      <div className="upper-row">
        <div>
          <h1>Total No of Links</h1>
          {urls && <h2>{urls.length}</h2>}
        </div>
        <div>
          <h1>Total No of Internal Links</h1>
          <h2>{lengthInternalLinks}</h2>
        </div>
        <div>
          <h1>Total No of External Links</h1>
          <h2>{urls.length - lengthInternalLinks}</h2>
        </div>
      </div>
      <div className="lower-row">
        <div>
          <h1>Broken Links</h1>
          <div className="broken-links">
            <h2>Internal Links</h2>
            <h2>External Links</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
