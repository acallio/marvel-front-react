import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

import "./home.scss";

const Home = ({ favoriteCharacters, sertFavoriteCharacters }) => {
  // for all characters request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  //query filters
  const [limitPerPage] = useState(100);
  const [skip, setSkip] = useState(0);

  //for search input filter
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const reqQueries = `?limit=${limitPerPage}&skip=${skip}&name=${search}`;
      const response = await axios.get(
        `http://localhost:4000/characters${reqQueries}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limitPerPage, skip, search]);
  // 100 personnages par page, avec barre de recherche de personnages,
  //           pagination possibilité de mettre en favoris
  return (
    <>
      {isLoading ? null : (
        <main id="home">
          <div className="character-search-holder">
            <input
              className="character-search"
              value={search}
              placeholder="Rechercher un personnage"
              onChange={(event) => setSearch(event.target.value)}
            />
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
                  favorites={favoriteCharacters}
                  setFavorites={sertFavoriteCharacters}
                  {...character}
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
