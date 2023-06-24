import React from "react";
import { Link } from "react-router-dom";

import "./docCard.css";

function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
}

function DocCard({ doc }) {
  return (
    <div className="doc-card-wrapper">
      <h2 className="doc-card-title">
        <Link className="doc-link" to={`/docs/${doc._id}`}>
          {doc.name}
        </Link>
      </h2>
      <div className="doc-card-details">
        <span className="doc-card-type">{doc.type}</span>
        <span className="doc-card-update">{formatDate(doc.updatedAt)}</span>
      </div>
    </div>
  );
}

export default DocCard;
