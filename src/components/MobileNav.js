import { useNavigate, useLocation } from "react-router-dom";

import "./mobileNav.scss";

import charactersIcon from "../assets/img/person-solid.svg";
import comicsIcon from "../assets/img/book-open-solid.svg";
import favoritesIcon from "../assets/img/star-solid.svg";
import joinIcon from "../assets/img/people-group-solid.svg";
import signOutIcon from "../assets/img/users-slash-solid.svg";
import closeNavIcon from "../assets/img/chevron-right-solid.svg";

const MobileNav = ({
  isAuthenticated,
  setIsAuthenticated,
  Cookies,
  showMobileNav,
  setShowMobileNav,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (showMobileNav) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "scroll";

  const closeModalAndNavigate = (path) => {
    setShowMobileNav(false);
    navigate(path);
  };

  return (
    <>
      {showMobileNav && (
        <div className="mobile-nav">
          <div className="modal"></div>
          <nav className="content">
            <ul>
              <li>
                <button
                  onClick={() => setShowMobileNav((prevState) => !prevState)}
                >
                  <img src={closeNavIcon} alt="close" />
                </button>
              </li>
              <li className={location.pathname === "/" && "selected"}>
                <button onClick={() => closeModalAndNavigate("/")}>
                  <img src={charactersIcon} alt="characters" />
                </button>
              </li>
              <li className={location.pathname === "/comics" && "selected"}>
                <button onClick={() => closeModalAndNavigate("/comics")}>
                  <img src={comicsIcon} alt="comics" />
                </button>
              </li>
              <li className={location.pathname === "/favorites" && "selected"}>
                <button onClick={() => closeModalAndNavigate("/favorites")}>
                  <img src={favoritesIcon} alt="favorites" />
                </button>
              </li>
              {isAuthenticated ? (
                <li className={location.pathname === "/login" && "selected"}>
                  <button
                    onClick={() => {
                      Cookies.remove("authenticated");
                      setIsAuthenticated(false);
                      navigate("/");
                    }}
                  >
                    <img src={signOutIcon} alt="signout" />
                  </button>
                </li>
              ) : (
                <li className={location.pathname === "/login" && "selected"}>
                  <button onClick={() => closeModalAndNavigate("/login")}>
                    <img src={joinIcon} alt="join" />
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileNav;
