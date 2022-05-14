import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

import gif from "../assets/img/loading.gifv";

import "./comics.scss";

const Comics = ({ isAuthenticated }) => {
  // for comics request
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
      const reqQueries = `?limit=${limitPerPage}&skip=${skip}&title=${search}`;
      const response = await axios.get(
        `https://ac-marvel.herokuapp.com/comics${reqQueries}`
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

      if (
        search !== "" &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const targetAuto = response.data.results[0].title.split("");
        setBlankSpace(targetAuto.splice(0, search.length).join(""));

        setAutoComplete(targetAuto.join(""));
      } else setAutoComplete("");

      setIsLoading(false);
    };

    fetchData();
  }, [limitPerPage, skip, search, isAuthenticated]);

  const handleKeypress = (key) => {
    if ((key === "Enter" || key === "ArrowRight") && data.results.length > 0) {
      setSearch(data.results[0].title);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="gif-loading">
          <img className="gif" src={gif} alt="loading" />
        </div>
      ) : (
        <main id="comics">
          <div className="comics-search-holder">
            <div className="comics-search">
              <input
                className="search"
                value={search}
                placeholder="Find a comics"
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
          />
          <div className="comics-cards-holder">
            {data.results &&
              data.results.map((comics) => {
                return (
                  <ContentCard
                    key={comics._id}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    {...comics}
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

export default Comics;
