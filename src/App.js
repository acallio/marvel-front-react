import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Character from "./pages/Character";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:id" element={<Character />} />
            <Route path="/comics" element={<Comics />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer title="Site réalisé par Adrien Callioni" />
      </Router>
    </div>
  );
};

export default App;
