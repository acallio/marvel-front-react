import React from "react";
import { Link } from "react-router-dom";

import "./contentCard.scss";

const ContentCard = ({ thumbnail, comics, _id, name, description }) => {
  const { path, extension } = thumbnail;
  return (
    <div className="content-card">
      <Link to={`/comics/:${comics}`}>
        <h4>{name}</h4>

        <img src={`${path}.${extension}`} alt="marvel hero" />
        <p>{description}</p>
      </Link>
    </div>
  );
};

export default ContentCard;
