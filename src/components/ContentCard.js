import React from "react";
import { Link } from "react-router-dom";

import fav from "../assets/img/favorite-avenger.svg";
import "./contentCard.scss";

import axios from "axios";

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

  const handleAddFavorite = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/favorites/modify",
        {
          savedId: _id,
        }
      );

      console.log(response.data);
      if (response.data === "added") {
        favorites
          ? setFavorites((prevState) => [...prevState, _id])
          : setFavorites([_id]);
      } else if (response.data === "removed") {
        if (favorites) {
          const arr = [...favorites];
          arr.splice(
            arr.findIndex((fav) => fav === _id),
            1
          );
          setFavorites(arr);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavoriteIcon = () => {
    //if name props it's a character else it's a comics
    const str =
      favorites && favorites.indexOf(_id) !== -1
        ? "favorite-active"
        : "favorite-inactive";
    return str;
  };

  return (
    <div className="content-card">
      <h4>{name ? name : title && decodeHtmlEntity(title)}</h4>
      <img
        className={checkFavoriteIcon()}
        src={fav}
        alt="favorite"
        onClick={handleAddFavorite}
      />
      <Link to={`/character/${_id}`}>
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
