import React from "react";

import "./footer.scss";
import githubIcon from "../assets/img/github.svg";

const Footer = () => {
  return (
    <footer>
      <span>Site réalisé par&nbsp;</span>
      <a
        href="https://github.com/acallio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>Adrien Callioni</span>
        <img src={githubIcon} alt="github" />
      </a>
    </footer>
  );
};

export default Footer;
