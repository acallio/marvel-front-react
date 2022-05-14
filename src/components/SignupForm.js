import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./signupForm.scss";

const SignupForm = ({
  userName,
  setUserName,
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

    const response = await axios.post(
      "https://ac-marvel.herokuapp.com/signup",
      {
        userName: userName,
        email: email,
        password: password,
      }
    );

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
            <p>Captain America wants you to join the battle against Hydra!</p>
            <p>
              Join us and you will be able to add characters and comics to your
              favorites
            </p>
          </div>
          <input
            type="text"
            placeholder="superhero name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
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
          <input className="submit-btn" type="submit" value="Register now!" />
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

export default SignupForm;
