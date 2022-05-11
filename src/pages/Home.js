import React from "react";
import { useState } from "react";

import "./home.scss";

const Home = ({ axios }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [limitPerPage] = useState(100);
  return (
    <main id="home">
      100 personnages par page, avec barre de recherche de personnages,
      pagination possibilité de mettre en favoris
    </main>
  );
};

export default Home;
