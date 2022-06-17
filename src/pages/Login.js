import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignupForm from "../components/SignupForm";
import LoginForm from "../components/LoginForm";

import wantYou from "../assets/img/wantyou.png";
import "./login.scss";

const Login = ({ isAuthenticated, setIsAuthenticated, Cookies }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, setLogin] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <main id="login">
          <img className="login-image" src={wantYou} alt="join us!" />
          {login ? (
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setLogin={setLogin}
              setIsAuthenticated={setIsAuthenticated}
              Cookies={Cookies}
              login={login}
            />
          ) : (
            <SignupForm
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              setLogin={setLogin}
              setIsAuthenticated={setIsAuthenticated}
              Cookies={Cookies}
              login={login}
            />
          )}
        </main>
      ) : (
        navigate("/")
      )}
    </>
  );
};

export default Login;
