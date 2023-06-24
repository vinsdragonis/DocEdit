import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "scrollreveal";

import "./header.css";

export default function Landing() {
  const sr = ScrollReveal({
    distance: "65px",
    duration: 2600,
    delay: 450,
  });

  sr.reveal(".header-title", { delay: 200, origin: "top" });
  sr.reveal(".header-sub-title", { delay: 300, origin: "top" });
  sr.reveal(".header-links", { delay: 400, origin: "top" });

  return (
    <div className="header">
      <h1 className="header-title">
        <span>Doc</span>
        <span>Edit</span>
      </h1>
      <h2 className="header-sub-title">
        An easy-to-use <span>document editor</span>
      </h2>
      <div className="header-links">
        <Link className="header-link" to="/login">
          Login
        </Link>
        <Link className="header-link" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
