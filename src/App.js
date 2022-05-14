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
// import ClickEffect from "./components/ClickEffect";

import Cookies from "js-cookie";

import "./App.scss";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("authenticated") || false
  );

  return (
    <div className="app">
      {/* <ClickEffect /> */}
      <Router>
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
          Cookies={Cookies}
        />
        <div className="container">
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
        </div>
        <Footer title="Site réalisé par Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
