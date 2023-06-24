import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./settings.css";

function Settings() {
  const { user, dispatch } = useContext(Context);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    // Prevent page reload
    event.preventDefault();
    dispatch({ type: "UPDATE_START" });
    setError("");
    const data = {
      id: user._id,
      name,
      username,
      email,
      active: true,
      password,
      desc,
    };
    if (data.name === "") {
      data.name = user.name;
    }
    if (data.username === "") {
      data.username = user.username;
    }
    if (data.email === "") {
      data.email = user.email;
    }
    if (data.password === "") {
      data.password = user.password;
    }
    const config = {
      method: "PUT",
      url: process.env.REACT_APP_SERVER + "/user/" + user._id,
      data: data,
    };
    axios(config)
      .then((res) => {
        // console.log(res);
        // navigate("/");
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        // console.log(res.data);
      })
      .catch((e) => {
        // console.log(e.response.data.message);
        setError(e.response.data.message);
        dispatch({ type: "UPDATE_FAILURE" });
      });
  };

  const handleDelete = () => {
    const config = {
      method: "DELETE",
      url: process.env.REACT_APP_SERVER + "/user/" + user._id,
      data: { id: user._id },
    };
    axios(config)
      .then((res) => {
        // console.log(res);
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      });
  };

  return (
    <div className="settings-form-wrapper">
      <div className="settings-form">
        <span className="error-msg">
          {error !== "" ? error : ""}
          {success === true ? "Updated successfully" : ""}
        </span>
        <h1 className="form-title">Settings</h1>
        <form autoComplete="off" onSubmit={handleUpdate}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Full name"
              autoComplete="off"
              // required
              name="name"
              // value={name}
              autoFocus={true}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              placeholder="username"
              autoComplete="off"
              // required
              name="username"
              // value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              // required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              // required
              name="password"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <textarea
              placeholder="Write your bio here"
              autoComplete="off"
              // required
              name="desc"
              // value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="button-container">
            {!deleteMode ? (
              <>
                <input type="submit" value="Update" />
                <button onClick={() => setDeleteMode(true)}>Delete</button>
              </>
            ) : (
              <>
                <button className="acc-del-ops" onClick={handleDelete}>
                  <i className="ri-check-line"></i>
                </button>
                <button
                  className="acc-del-ops"
                  onClick={() => setDeleteMode(false)}
                >
                  <i className="ri-close-line"></i>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
