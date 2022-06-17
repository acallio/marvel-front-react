import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";

//pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Character from "./pages/Character";
import Login from "./pages/Login";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
// import ClickEffect from "./components/ClickEffect";

import Cookies from "js-cookie";

import bannerLeft from "../src/assets/img/marvel1.jpg";
import bannerRight from "../src/assets/img/marvel2.jpg";

import "./App.scss";

//idée d'amélio ajouter des images sur les cotés.
// ajouter une alert pour expliquer a l'utilisateur qu'il faut etre log pour fav
//pas oublier de prendre les extensions du mac avant de le rendre
//reparer l'autocomplete

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("authenticated") || false
  );

  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className="app">
      {/* <ClickEffect /> */}
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          Cookies={Cookies}
          setShowMobileNav={setShowMobileNav}
        />
        <MobileNav
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          Cookies={Cookies}
          showMobileNav={showMobileNav}
          setShowMobileNav={setShowMobileNav}
        />
        <div className="container">
          <img
            className="img-banner left-side"
            src={bannerLeft}
            alt="banner left"
          />
          <Routes>
            <Route
              path="/"
              element={<Home isAuthenticated={isAuthenticated} />}
            />
            <Route path="/character/:id" element={<Character />} />
            <Route
              path="/comics"
              element={<Comics isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/favorites"
              element={<Favorites isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/login"
              element={
                <Login
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                  Cookies={Cookies}
                />
              }
            ></Route>
          </Routes>
          <img
            className="img-banner right-side"
            src={bannerRight}
            alt="banner right"
          />
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
