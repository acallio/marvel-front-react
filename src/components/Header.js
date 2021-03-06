import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import logo from "../assets/img/logo-marvel.svg";
import bars from "../assets/img/bars-solid.svg";

import "./header.scss";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
  Cookies,
  setShowMobileNav,
}) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo-holder">
        <Link to="/">
          <img className="logo-img" src={logo} alt="marvel" />
        </Link>
      </div>
      <button
        className="open-mobile-nav"
        onClick={() => setShowMobileNav((prevState) => !prevState)}
      >
        <img src={bars} alt="menu" />
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={() => {
                  Cookies.remove("authenticated");
                  setIsAuthenticated(false);
                  navigate("/");
                }}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Join the Avengers!</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
