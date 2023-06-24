import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./registerForm.css";

function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "full_name") {
      setName(event.target.value);
    } else if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    const data = { name, username, email, password };
    const config = {
      method: "POST",
      url: process.env.REACT_APP_SERVER + "/auth/register",
      data: data,
    };
    axios(config)
      .then((res) => {
        res && navigate("/login");
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  return (
    <div className="register-form-wrapper">
      <div className="register-form">
        <span className="error-msg">{error !== "" ? error : ""}</span>
        <h1 className="form-title">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Full name"
              autoComplete="new-password"
              required
              name="full_name"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              autoComplete="new-password"
              required
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              autoComplete="new-password"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
