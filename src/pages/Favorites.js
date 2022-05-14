import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ContentCard from "../components/ContentCard";

import "./favorites.scss";

//axios get favorites and then get them by id

const Favorites = ({ isAuthenticated }) => {
  // for comics request
  const [isLoading, setIsLoading] = useState(true);

  const [favorites, setFavorites] = useState();

  const [characters, setCharacters] = useState();
  const [comics, setComics] = useState();

  const navigate = useNavigate();

  //autre possibilité, quand j'ajoute un favori, j'aoute toutes ses données que je stock en DB
  useEffect(() => {
    const fetchData = async () => {
      const favResponse = await axios.get(
        "https://ac-marvel.herokuapp.com/favorites",
        {
          headers: {
            authorization: `Bearer ${isAuthenticated}`,
          },
        }
      );
      // return array of objects with newName, newID, type (comics, character)
      setFavorites(favResponse.data);

      const charArray = favResponse.data.filter(
        (elem) => elem.type === "character"
      );

      setCharacters(charArray);

      const comicsArray = favResponse.data.filter(
        (elem) => elem.type === "comics"
      );

      setComics(comicsArray);

      setIsLoading(false);
    };
    isAuthenticated ? fetchData() : navigate("/login");
  }, [isAuthenticated, navigate]);
  return (
    <>
      {isAuthenticated ? (
        isLoading ? null : (
          <main id="favorites">
            <div className="character-cards-holder">
              {characters &&
                characters.map((character) => {
                  return (
                    <ContentCard
                      key={character._id}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      comics={character.comics}
                      description={character.description}
                      thumbnail={character.image}
                      _id={character.newID}
                      name={character.newName}
                      isAuthenticated={isAuthenticated}
                    />
                  );
                })}
            </div>
            <div className="comics-cards-holder">
              {comics &&
                comics.map((comic) => {
                  return (
                    <ContentCard
                      key={comic._id}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      description={comic.description}
                      thumbnail={comic.image}
                      _id={comic.newID}
                      title={comic.newName}
                      isAuthenticated={isAuthenticated}
                    />
                  );
                })}
            </div>
          </main>
        )
      ) : null}
    </>
  );
};

export default Favorites;
