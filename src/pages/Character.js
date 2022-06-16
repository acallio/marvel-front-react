import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import marvelComics from "../assets/img/marvel-comics.svg";

import "./character.scss";

const Character = () => {
  //info coming from ContentCard. Id of character
  const { id } = useParams();

  // for a single character request
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ac-marvel.herokuapp.com/comics/${id}`
        );

        setData(response.data);

        // #region return
        //         {thumbnail: {…}, comics: Array(3), _id: '5fcf91f4d8a2480017b91454', name: 'A-Bomb (HAS)', description: "Rick Jones has been Hulk's best bud since day one,…ses it like a giant bowling ball of destruction! ", …}
        // comics: Array(3)
        // 0: {thumbnail: {…}, _id: '5fce17e278edeb0017c93def', title: 'Hulk (2008) #53', description: 'The Mayan Gods are here! Guest starring Alpha Flight, Machine Man, She-Hulks, A-Bomb!', __v: 0}
        // 1: {thumbnail: {…}, _id: '5fce17ca78edeb0017c93da2', title: 'Hulk (2008) #54', description: 'Mayan Gods! End of the world as we know it! Guest …ing Alpha Flight, Machine Man, She-Hulks, A-Bomb!', __v: 0}
        // 2: {thumbnail: {…}, _id: '5fce17c878edeb0017c93d62', title: 'Hulk (2008) #55', description: 'The hands of the doomsday clock race towards MAYAN…gods return. Rick "A-Bomb" Jones falls in battle!', __v: 0}
        // length: 3
        // [[Prototype]]: Array(0)
        // description: "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! "
        // name: "A-Bomb (HAS)"
        // thumbnail: {path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16', extension: 'jpg'}
        // __v: 0
        // _id: "5fcf91f4d8a2480017b91454"
        //#endregion

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
            <div className="info-left">
              <h4>{data.name}</h4>
              <img
                src={
                  data.thumbnail.path.endsWith("image_not_available")
                    ? marvelComics
                    : `${data.thumbnail.path}.${data.thumbnail.extension}`
                }
                alt="marvel hero"
              />
            </div>
            <div className="info-right">
              <p>
                {data.description
                  ? data.description
                  : "No information found. This suspicious character is under investigation."}
              </p>
            </div>
          </div>
          <p className="appears-in">Appears in:</p>
          <div className="character-in-comics">
            {data.comics.map((comic, index) => {
              return (
                <div className="comic-holder" key={comic._id}>
                  <h4>{data.comics[index].title}</h4>
                  <div className="img-holder">
                    <img
                      src={
                        data.comics[index].thumbnail.path.endsWith(
                          "image_not_available"
                        )
                          ? marvelComics
                          : `${data.comics[index].thumbnail.path}.${data.comics[index].thumbnail.extension}`
                      }
                      alt="comics"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}
    </>
  );
};

export default Character;
