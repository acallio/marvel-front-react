import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import "./character.scss";

const Character = () => {
  //info coming from ContentCard. Id of character
  const { id } = useParams();

  // for a single character request
  const [isLoading, setIsLoading] = useState(true);
  const [charInfo, setCharInfo] = useState([]);
  const [comicsInfo, setComicsInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const charInfoResponse = await axios.get(
          `http://localhost:4000/character/${id}`
        );

        setCharInfo(charInfoResponse.data);

        const comicsInfoResponse = await axios.get(
          `http://localhost:4000/comics`
        );

        console.log(comicsInfoResponse);

        //no response from server. comicsInfoResponse is undefined
        for (let i = 0; i < charInfoResponse.data.comics.length; i++) {
          for (let j = 0; j < comicsInfoResponse.length; j++) {
            if (charInfo.data.comics[i]._id === comicsInfoResponse[j]._id) {
              comicsInfo === undefined
                ? setComicsInfo(comicsInfoResponse[j])
                : setComicsInfo((prevState) => [
                    ...prevState,
                    comicsInfoResponse[j],
                  ]);
            }
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  //character description, comics he is featured in
  return (
    <>
      {isLoading ? null : (
        <main id="character-page">
          <div className="info">
            <h4>{charInfo.name}</h4>
            <img
              src={`${charInfo.thumbnail.path}.${charInfo.thumbnail.extension}`}
              alt="marvel hero"
            />
            <p>{charInfo.description}</p>
          </div>
          <aside className="character-in-comics">
            {charInfo.comics.map((comic, index) => {
              return (
                <div key={comic}>
                  <img
                    src={`${comicsInfo[index].thumbnail.path}.${comicsInfo[index].thumbnail.extension}`}
                    alt=""
                  />
                </div>
              );
            })}
          </aside>
        </main>
      )}
    </>
  );
};

export default Character;
