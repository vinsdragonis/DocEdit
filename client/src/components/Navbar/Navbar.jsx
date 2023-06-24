import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const generateUniqueId = require("generate-unique-id");

import { Context } from "../../context/Context";

import "./navbar.css";

function Navbar(props) {
  const { user, dispatch } = useContext(Context);
  const [doc, setDoc] = useState({});
  const [docId, setDocId] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const page = props.page;

  const toggleNav = () => {
    setToggle(!toggle);
  };

  const handleCreateDoc = (event) => {
    // Prevent page reload
    event.preventDefault();
    setError("");
    const id = generateUniqueId({
      length: 15,
      useLetters: true,
      excludeSymbols: [
        "@",
        "#",
        "|",
        "/",
        ",",
        "%",
        "^",
        "&",
        "*",
        ":",
        ";",
        "\\",
        "`",
        "~",
        '"',
        "'",
      ],
    });
    const data = {
      name: id.toString(),
      author: user._id,
      content: "",
      type: "Document",
    };
    const config = {
      method: "POST",
      url: process.env.REACT_APP_SERVER + "/doc",
      data: data,
    };
    axios(config)
      .then((res) => {
        setDoc(res.data);
        // console.log(res.data);
        setDocId(res.data._id);
        setDoc({});
        navigate("/docs/" + res.data._id);
        // window.open(`/docs/" + ${id}`, "_blank", "rel=noopener noreferrer");
      })
      .catch((e) => {
        // console.log(e.response);
        console.log(e.response.data.message);
        setError(e.response.data.message);
        setDoc({});
      });
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 100);
    });
  }, [user, doc]);

  return (
    <header className={`${scroll ? "navbar scrolled" : "navbar"}`}>
      <span className="nav-logo">
        <Link className="nav-link" to="/">
          DocEdit
        </Link>
      </span>
      {user ? (
        <ul className={`${toggle ? "nav active" : "nav"}`}>
          {/* <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/features">
              Features
            </Link>
          </li> */}
          <li>
            <Link
              className="nav-link"
              onClick={handleCreateDoc}
              target={"_blank"}
              rel="noopener noreferrer"
              // to={`/docs/${docId}`}
            >
              New Doc
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/settings">
              {user.name}
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
          <li>
            <Link className="nav-link notification" to="/notifications">
              <i className="ri-notification-2-fill"></i>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={`${toggle ? "nav active" : "nav"}`}>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/features">
              Features
            </Link>
          </li>
          {page !== "login" && (
            <li>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
          {page !== "register" && (
            <li>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          )}
        </ul>
      )}
      <button className="hamburger" onClick={toggleNav}>
        {toggle ? (
          <i className="ri-menu-2-line"></i>
        ) : (
          <i className="ri-menu-line"></i>
        )}
      </button>
    </header>
  );
}

export default Navbar;
