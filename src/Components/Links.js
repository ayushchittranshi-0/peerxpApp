import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkPageActions } from "../store";
import jQuery from "jquery";
import "./Links.css";

const Links = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.DashboardReducer.posts);
  const urls = useSelector((state) => state.LinksPageReducer.urls);
  const intUrl = useSelector((state) => state.LinksPageReducer.intUrl);
  const brokenUrl = useSelector((state) => state.LinksPageReducer.brokenUrl);

  console.log(urls);

  async function UrlExists(url) {
    fetch(url, {
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 404)
          dispatch(LinkPageActions.assignBrokenUrl(url));
      })
      .catch((error) => {
        dispatch(LinkPageActions.assignBrokenUrl(url));
      });
  }

  const findLinks = (Htmlstr) => {
    var rawHTML = Htmlstr;

    var doc = document.createElement("html");
    doc.innerHTML = rawHTML;
    var links = doc.getElementsByTagName("a");
    var urls = [[], []];

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("href")[0] !== "#")
        urls[0].push(links[i].getAttribute("href"));

      if (
        links[i].getAttribute("href").substring(0, 26) ===
        "https://ghost-blog.ipxp.in"
      )
        urls[1].push(links[i].getAttribute("href"));
    }
    return urls;
  };

  useEffect(() => {
    if (urls.length === 0) {
      let tempUrl = [];
      let tempInternalLinks = [];
      let l = posts.length;

      if (l > 0) {
        let i = 0;
        while (i < l) {
          dispatch(LinkPageActions.assignUrls(findLinks(posts[i].html)[0]));
          dispatch(LinkPageActions.assignIntUrl(findLinks(posts[i].html)[1]));

          // tempUrl = [...tempUrl, ...findLinks(posts[i].html)[0]];
          // tempInternalLinks = [
          //   ...tempInternalLinks,
          //   ...findLinks(posts[i].html)[1],
          // ];
          i = i + 1;
        }
      }
      // dispatch(LinkPageActions.assignUrls(tempUrl));
      // dispatch(LinkPageActions.assignIntUrl(tempInternalLinks));
    }
  }, [posts]);

  useEffect(() => {
    if (brokenUrl.length === 0) {
      let l = urls.length;

      if (l > 0) {
        let i = 0;
        while (i < l) {
          UrlExists(urls[i]);
          i = i + 1;
        }
      }
    }
  }, [urls]);

  return (
    <div className="Container">
      <div className="upper-row">
        <div>
          <h1>Total No of Links</h1>
          {urls && <h2>{urls.length}</h2>}
        </div>
        <div>
          <h1>Total No of Internal Links</h1>
          <h2>{intUrl.length}</h2>
        </div>
        <div>
          <h1>Total No of External Links</h1>
          <h2>{urls.length - intUrl.length}</h2>
        </div>
      </div>
      <div className="lower-row">
        <div>
          <h1>Broken Links</h1>
          <div className="broken-links">
            <div className="List" id="ListL2">
              <h1>Internal Links</h1>
              {brokenUrl && (
                <ul>
                  {brokenUrl.map((item, index) => {
                    if (intUrl.indexOf(item) !== -1)
                      return (
                        <li key={index}>
                          <a
                            href={item}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item}
                          </a>
                        </li>
                      );
                    return;
                  })}
                </ul>
              )}
            </div>
            <div className="List" id="ListL">
              <h1>External Links</h1>
              {brokenUrl && (
                <ul>
                  {brokenUrl.map((item, index) => {
                    if (intUrl.indexOf(item) === -1)
                      return (
                        <li key={index}>
                          <a
                            href={item}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item}
                          </a>
                        </li>
                      );
                    return;
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
