import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./AddNote.css";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const handleCloseClick = () => navigate(-1);
  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card bg-light" style={{ width: "40rem" }}>
        <div className="d-flex justify-content-between">
          <h3 className="mx-2 mt-2">Add a note</h3>
          <button type="button" class="btn-close mx-2 mt-2" aria-label="Close" onClick={handleCloseClick}></button>
        </div>
        <hr />
        <div className="container">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="custom-input"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <hr />
            <div className="mb-3">
              <textarea
                className="custom-textarea"
                id="description"
                rows="5"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <hr />
            <div className="mb-3">
              <input
                type="text"
                className="custom-input"
                id="tag"
                placeholder="Enter tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Add Note"
              className="btn btn-primary mb-3"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
