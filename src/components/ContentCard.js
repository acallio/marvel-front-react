import React from "react";
import { Link, useNavigate } from "react-router-dom";

import fav from "../assets/img/favorite-avenger.svg";
import marvelComics from "../assets/img/marvel-comics.svg";
import "./contentCard.scss";

import axios from "axios";

const ContentCard = ({
  thumbnail,
  comics,
  _id,
  name,
  title,
  description,
  favorites, // can be either characters of comics
  setFavorites, // can be either characters of comics
  isAuthenticated,
}) => {
  const { path, extension } = thumbnail;

  const navigate = useNavigate();
  const decodeHtmlEntity = (str) => {
    return str.replace(/&#(\d+);/g, (match, dec) => {
      return String.fromCharCode(dec);
    });
  };

  const handleAddFavorite = async () => {
    try {
      if (isAuthenticated) {
        const response = await axios.post(
          "https://ac-marvel.herokuapp.com/favorites/modify",
          {
            savedId: _id,
            newName: `${name ? name : title}`,
            type: comics && comics.length > 0 ? "character" : "comics",
            image: { path: thumbnail.path, extension: thumbnail.extension },
            description: description,
            comics: `${name}` ? comics : [],
          },
          {
            headers: {
              authorization: `Bearer ${isAuthenticated}`,
            },
          }
        );
        if (response.data === "added") {
          favorites
            ? setFavorites((prevState) => [
                ...prevState,
                {
                  newID: _id,
                  newName: `${name ? name : title}`,
                  type: comics && comics.length > 0 ? "character" : "comics",
                  image: {
                    path: thumbnail.path,
                    extension: thumbnail.extension,
                  },
                  description: description,
                  comics: `${name}` ? comics : [], //${name ? comics : []}`,
                },
              ])
            : setFavorites([
                {
                  newID: _id,
                  newName: `${name ? name : title}`,
                  type: comics && comics.length > 0 ? "character" : "comics",
                  image: {
                    path: thumbnail.path,
                    extension: thumbnail.extension,
                  },
                  description: description,
                  comics: `${name}` ? comics : [],
                },
              ]);
        } else if (response.data === "removed") {
          if (favorites) {
            const arr = [...favorites];
            arr.splice(
              arr.findIndex((fav) => fav.newID === _id),
              1
            );
            setFavorites(arr);
          }
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkFavoriteIcon = () => {
    //if name props it's a character else it's a comics
    if (isAuthenticated) {
      const str =
        favorites && favorites.findIndex((fav) => fav.newID === _id) !== -1
          ? "favorite-active"
          : "favorite-inactive";
      return str;
    } else return "favorite-inactive";
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
      <Link
        to={name ? `/character/${_id}` : ""}
        className={name ? "" : "cursor-default"}
      >
        <img
          className="main-image"
          src={
            path.endsWith("image_not_available")
              ? marvelComics
              : `${path}.${extension}`
          }
          alt="marvel hero"
        />
      </Link>
      <p>{description && decodeHtmlEntity(description)}</p>
    </div>
  );
};

export default ContentCard;
