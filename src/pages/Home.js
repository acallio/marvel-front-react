import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

import gif from "../assets/img/loading.gifv";

import "./home.scss";
//characters route
const Home = ({ isAuthenticated }) => {
  // for all characters request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [favorites, setFavorites] = useState();

  //query filters
  const [limitPerPage] = useState(100);
  const [skip, setSkip] = useState(0);

  //for search input filter
  const [search, setSearch] = useState("");

  const [autoComplete, setAutoComplete] = useState("");
  const [blankSpace, setBlankSpace] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setAutoComplete("");
      setBlankSpace("");
      const reqQueries = `?limit=${limitPerPage}&skip=${skip}&name=${search}`;
      const response = await axios.get(
        `https://ac-marvel.herokuapp.com/characters${reqQueries}`
      );

      setData(response.data);

      if (isAuthenticated) {
        const favResponse = await axios.get(
          "https://ac-marvel.herokuapp.com/favorites",
          {
            headers: {
              authorization: `Bearer ${isAuthenticated}`,
            },
          }
        );

        setFavorites(favResponse.data);
      }

      if (search !== "" && response.data.results.length > 0) {
        const targetAuto = response.data.results[0].name.split("");
        setBlankSpace(targetAuto.splice(0, search.length).join(""));
        setAutoComplete(targetAuto.join(""));
      } else setAutoComplete("");

      setIsLoading(false);
    };
    fetchData();
  }, [limitPerPage, skip, search, isAuthenticated]);

  const handleKeypress = (key) => {
    if ((key === "Enter" || key === "ArrowRight") && data.results.length > 0) {
      setSearch(data.results[0].name);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="gif-loading">
          <img className="gif" src={gif} alt="loading" />
        </div>
      ) : (
        <main id="home">
          <div className="character-search-holder">
            <div className="character-search">
              <input
                className="search"
                value={search}
                placeholder="Rechercher un personnage"
                onChange={(event) => setSearch(event.target.value)}
                onKeyUp={(e) => handleKeypress(e.key)}
              />
              <div className="autocomplete-holder">
                <span className="blank-space">{blankSpace}</span>
                <span className="autocomplete">{autoComplete}</span>
              </div>
            </div>
          </div>
          <Pagination
            search={search}
            limitPerPage={limitPerPage}
            count={data.count}
            skip={skip}
            setSkip={setSkip}
            characters={true}
          />
          <div className="character-cards-holder">
            {data.results.map((character) => {
              return (
                <ContentCard
                  key={character._id}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  {...character}
                  isAuthenticated={isAuthenticated}
                />
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
