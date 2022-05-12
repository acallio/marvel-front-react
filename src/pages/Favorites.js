import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import ContentCard from "../components/ContentCard";
import Pagination from "../components/Pagination";

import "./favorites.scss";

//axios get favorites and then get them by id

const Favorites = () => {
  // for comics request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState();

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

      const favResponse = await axios.get("http://localhost:4000/favorites");
      const arr = [];
      for (let i = 0; i < favResponse.data.length; i++) {
        arr.push(favResponse.data[i].newID);
      }
      setFavorites(arr);

      setIsLoading(false);
    };
    fetchData();
  }, [limitPerPage, skip]);
  return (
    <>
      {isLoading ? null : (
        <main id="favorites">
          <Pagination
            search={search}
            limitPerPage={limitPerPage}
            count={data.count}
            skip={skip}
            setSkip={setSkip}
          />
          <div className="comics-cards-holder">
            {data.results.map((comics) => {
              return (
                <ContentCard
                  key={comics._id}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  {...comics}
                />
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default Favorites;
