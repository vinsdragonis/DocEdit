import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./loginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();
    setError("");
    const data = { username, password };
    const config = {
      method: "POST",
      url: process.env.REACT_APP_SERVER + "/auth/login",
      data: data,
    };
    axios(config)
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      })
      .catch((e) => {
        setError(e.response.data.message);
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="login-form-wrapper">
      <div className="login-form">
        <span className="error-msg">{error !== "" ? error : ""}</span>
        <h1 className="form-title">Login</h1>
        <form onSubmit={handleSubmit}>
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
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="link-container">
            <Link className="forgot-password" to="/">
              Forgot password?
            </Link>
          </div>
          <div className="button-container">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
