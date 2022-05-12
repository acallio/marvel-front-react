import React from "react";
import { Link } from "react-router-dom";

import fav from "../assets/img/favorite-avenger.svg";
import "./contentCard.scss";

const ContentCard = ({
  thumbnail,
  // comics,
  _id,
  name,
  title,
  description,
  favorites, // can be either characters of comics
  setFavorites, // can be either characters of comics
}) => {
  const { path, extension } = thumbnail;

  const decodeHtmlEntity = (str) => {
    return str.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });
  };

  return (
    <div className="content-card">
      <h4>{name ? name : title && decodeHtmlEntity(title)}</h4>
      <Link to={`/character/${_id}`}>
        <img className={"favorite-inactive"} src={fav} alt="favorite" />

        <img
          className="main-image"
          src={`${path}.${extension}`}
          alt="marvel hero"
        />
      </Link>
      <p>{description && decodeHtmlEntity(description)}</p>
    </div>
  );
};

export default ContentCard;
