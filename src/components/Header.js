import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/img/logo-marvel.svg";

import "./header.scss";

const Header = () => {
  return (
    <header>
      <div className="logo-holder">
        <Link to="/">
          <img className="logo-img" src={logo} alt="marvel" />
        </Link>
      </div>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
