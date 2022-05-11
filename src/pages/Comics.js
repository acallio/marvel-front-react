import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

import "./comics.scss";

const Comics = () => {
  // for comics request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  //query filters
  const [limitPerPage] = useState(100);
  const [skip, setSkip] = useState(0);

  //for search input filter
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const reqQueries = `?limit=${limitPerPage}&skip=${skip}&title=${search}`;
      const response = await axios.get(
        `http://localhost:4000/comics${reqQueries}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [limitPerPage, skip, search]);
  return (
    // <div>
    //   List comics marvel par ordre alphabetique sous forme de fiche + barre de
    //   recherche pour les comics possibilité de mettre en favori
    // </div>
    <>
      {isLoading ? null : (
        <main id="comics">
          <div className="comics-search-holder">
            <input
              className="comics-search"
              value={search}
              placeholder="Rechercher un comics"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <Pagination
            search={search}
            limitPerPage={limitPerPage}
            count={data.count}
            skip={skip}
            setSkip={setSkip}
          />
          <div className="comics-cards-holder">
            {data.results.map((comics) => {
              return <ContentCard key={comics._id} {...comics} />;
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default Comics;
