import React from "react";
import { useParams } from "react-router-dom";

import "./character.scss";

const Character = () => {
  //info coming from ContentCard. Id of character
  const { _id } = useParams();

  //character description, comics he is featured in
  return <main>Character</main>;
};

export default Character;
