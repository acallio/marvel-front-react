import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

import axios from "axios";
import cookies from "js-cookie";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home axios={axios} />} />
            <Route path="/" element={<Comics axios={axios} />} />
            <Route
              path="/"
              element={<Favorites axios={axios} cookies={cookies} />}
            />
          </Routes>
        </div>
        <Footer title="Site réalisé par Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
