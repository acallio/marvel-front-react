import React from "react";
import { useState, useEffect } from "react";

import ContentCard from "../components/ContentCard";

import "./home.scss";

const Home = ({ axios }) => {
  // for character request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  //query filters
  const [limitPerPage] = useState(50);
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
          <div className="character-cards-holder">
            {data.results.map((character, index) => {
              return <ContentCard key={character._id} {...character} />;
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
