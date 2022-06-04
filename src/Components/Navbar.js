import React, { Fragment } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Fragment>
      <header>
        <Link to="/" className="logo">
          <img
            src="https://cdn.pixabay.com/photo/2019/06/13/07/23/black-and-white-4270982__340.png"
            alt="logo"
          />
          GHOSTDASH ACME
        </Link>
        <div className="container">
          <ul className="navbarLinkList">
            <li>
              <NavLink to="/" className="navbarLink">
                DashBoard
              </NavLink>
            </li>

            <li>
              <NavLink to="/posts" className="navbarLink">
                Posts
              </NavLink>
            </li>

            <li>
              <NavLink to="/links" className="navbarLink">
                Links
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
