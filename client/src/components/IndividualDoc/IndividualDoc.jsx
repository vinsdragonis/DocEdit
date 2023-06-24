import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import axios from "axios";

import { Context } from "../../context/Context";

import "./individualDoc.css";

function formatDate(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
}

function IndividualDoc() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [doc, setDoc] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const navigate = useNavigate();

  const fetchDoc = async () => {
    const config = {
      method: "GET",
      url: process.env.REACT_APP_SERVER + "/doc/u/" + user._id + "/d/" + path,
    };
    await axios(config, { mode: "cors" })
      .then((res) => {
        setDoc(res.data);
        setName(res.data.name);
        setType(res.data.type);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = async () => {
    const author = user._id;
    const data = {
      name,
      author,
      type,
      content,
    };
    const config = {
      method: "PUT",
      url: process.env.REACT_APP_SERVER + "/doc/" + doc._id,
      data: data,
    };
    await axios(config, { mode: "cors" })
      .then((res) => {
        console.log(res);
        console.log("Updated successfully");
        setUpdateMode(false);
      })
      .catch((err) => {
        console.log("Update failed");
        console.log(err);
      });
  };

  const handleDelete = async () => {
    const author = user._id;
    const data = { author };
    const config = {
      method: "DELETE",
      url: process.env.REACT_APP_SERVER + "/doc/" + doc._id,
      data: data,
    };
    await axios(config, { mode: "cors" })
      .then((res) => {
        console.log(res);
        console.log("Deleted successfully");
        setUpdateMode(false);
        navigate("/");
      })
      .catch((err) => {
        console.log("Delete failed");
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDoc();
  }, [path, updateMode]);

  return (
    <div className="individual-doc-panel">
      <div className="individual-doc-panel-wrapper">
        <div className="individual-doc-panel-details">
          {!updateMode ? (
            <>
              <h2 className="individual-doc-name">{doc.name}</h2>
              <hr />
            </>
          ) : (
            <>
              <input
                type="text"
                className="individual-doc-name-editor"
                value={name}
                autoFocus
                onChange={(e) => setName(e.target.value)}
                maxLength="30"
              />
            </>
          )}
          <div className="individual-doc-panel-details-mid">
            <h3 className="individual-doc-detail">
              Author: <span>{user.username}</span>
            </h3>
            <h3 className="individual-doc-detail">
              Type:
              {!updateMode ? (
                <span> {doc.type}</span>
              ) : (
                <input
                  type="text"
                  className="individual-doc-type-editor"
                  value={type}
                  autoFocus
                  onChange={(e) => setType(e.target.value)}
                />
              )}
            </h3>
            <h3 className="individual-doc-detail">
              Updated on: <span>{formatDate(doc.updatedAt)}</span>
            </h3>
            <h3 className="individual-doc-detail">
              Created on: <span>{formatDate(doc.createdAt)}</span>
            </h3>
          </div>
          <div className="individual-doc-panel-details-mid">
            <p className="individual-doc-ops">
              {updateMode && (
                <span className="individual-doc-edit-msg">Update doc?</span>
              )}
              {deleteMode && (
                <span className="individual-doc-delete-msg">Delete doc?</span>
              )}
            </p>
          </div>
          {!updateMode ? (
            <div className="individual-doc-panel-details-mid ops-panel">
              {!deleteMode && (
                <>
                  <button
                    className="individual-doc-edit-btn"
                    onClick={() => setUpdateMode(true)}
                  >
                    <i className="ri-edit-box-line"></i>
                  </button>
                  <button
                    className="individual-doc-delete-btn"
                    onClick={() => setDeleteMode(true)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </>
              )}
              {deleteMode && (
                <>
                  <button
                    className="individual-doc-edit-btn"
                    onClick={handleDelete}
                  >
                    <i className="ri-check-line"></i>
                  </button>
                  <button
                    className="individual-doc-delete-btn"
                    onClick={() => setDeleteMode(false)}
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="individual-doc-panel-details-mid ops-panel">
              <button
                className="individual-doc-edit-submit-btn"
                onClick={handleUpdate}
              >
                <i className="ri-check-line"></i>
              </button>
              <button
                className="individual-doc-edit-cancel-btn"
                onClick={() => setUpdateMode(false)}
              >
                <i className="ri-close-line"></i>
              </button>
            </div>
          )}
        </div>
        {!updateMode ? (
          <div className="individual-doc-content-panel">
            <p className="individual-doc-content">{doc.content}</p>
          </div>
        ) : (
          <div className="individual-doc-content-panel">
            <textarea
              className="individual-doc-content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            >
              {/* {doc.content} */}
            </textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default IndividualDoc;
