import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

//pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Character from "./pages/Character";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

import cookies from "js-cookie";

import "./App.scss";

const App = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState();
  const [favoriteComics, setFavoriteComics] = useState();

  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  favoriteCharacters={favoriteCharacters}
                  setFavoriteCharacters={setFavoriteCharacters}
                />
              }
            />
            <Route path="/character/:id" element={<Character />} />
            <Route
              path="/comics"
              element={
                <Comics
                  favoriteComics={favoriteComics}
                  setFavoriteComics={setFavoriteComics}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  favoriteCharacters={favoriteCharacters}
                  setFavoriteCharacters={setFavoriteCharacters}
                  favoriteComics={favoriteComics}
                  setFavoriteComics={setFavoriteComics}
                  cookies={cookies}
                />
              }
            />
          </Routes>
        </div>
        <Footer title="Site réalisé par Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
