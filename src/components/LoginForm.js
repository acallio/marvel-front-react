import React from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./loginForm.scss";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setLogin,
  setIsAuthenticated,
  Cookies,
}) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/login", {
      email: email,
      password: password,
    });

    Cookies.remove("authenticated");
    Cookies.set("authenticated", response.data.token);
    setIsAuthenticated(response.data.token);
    navigate("/");
  };
  return (
    <>
      <div className="form-holder">
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="presentation">
            <p>Type your secret information to access the Avenger's database</p>
            <p>Be careful, Hydra is always watching...</p>
          </div>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input className="submit-btn" type="submit" value="Log in!" />
        </form>
        <button
          className="already-member-btn"
          onClick={() => {
            setLogin((prevState) => !prevState);
          }}
        >
          Already a member ? Log in!
        </button>
      </div>
    </>
  );
};

export default LoginForm;
