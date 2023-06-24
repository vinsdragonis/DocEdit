import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import DocCard from "../DocCard/DocCard";
import { Context } from "../../context/Context";

import "./docsPanel.css";

function DocsPanel() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Context);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);

  const loadMore = () => {
    setLimit(limit + 3);
  };

  const fetchDocs = async () => {
    const config = {
      method: "GET",
      url: process.env.REACT_APP_SERVER + "/doc/u/" + user._id + "/l/" + limit,
    };
    await axios(config, { mode: "cors" })
      .then((res) => {
        setDocs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setError("");
    fetchDocs();
  }, [user, docs, limit]);

  return (
    <div className="docs-panel">
      <h1 className="dashboard-my-docs">My Docs</h1>
      {error && (
        <span className="doc-err-msg">{error.response.data.message}</span>
      )}
      <div className="docs-panel-container">
        {docs.slice().map((d) => (
          <DocCard key={d._id} doc={d} />
        ))}
      </div>
      <button className="load-more-btn" onClick={loadMore}>
        Load more
      </button>
    </div>
  );
}

export default DocsPanel;
