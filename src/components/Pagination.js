import React from "react";
import { useState, useEffect } from "react";
import "./pagination.scss";

const Pagination = ({ search, limitPerPage, count, skip, setSkip }) => {
  const [numberOfPages] = useState(Math.ceil(count / limitPerPage));
  const [page, setPage] = useState([1]);

  useEffect(() => {
    setPage([1]);
    for (let i = 2; i < numberOfPages; i++) {
      const p = i;
      setPage((prevState) => [...prevState, p]);
    }
  }, [numberOfPages]);

  return (
    <>
      {search === "" ? (
        <div id="pagination">
          {page.length > 1
            ? page.map((p, index) => {
                return (
                  <button
                    className={
                      index + 1 === skip / limitPerPage ? "active" : ""
                    }
                    key={index}
                    onClick={() => {
                      setSkip((index + 1) * limitPerPage);
                    }}
                  >
                    {p}
                  </button>
                );
              })
            : "1"}
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
